<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
  
  interface Field {
    id: number;
    value: string;
  }
  const fields = reactive<Field[]>([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' }
  ]);
  const vowelCounts = ref<number[]>([0, 0, 0]);
  const searchText = ref<string>('');

  const addField = () => {
    if (fields.length < 10) {
      fields.push({ id: Date.now(), value: '' });
      vowelCounts.value.push(0);
    }
  };
  const removeField = (index: number) => {
  
    if (fields.length > 1) {
      fields.splice(index, 1);
      vowelCounts.value.splice(index, 1);
    }
  };
  const updateVowelCount = (index: number) => {
    const count = (fields[index].value.match(/[aeiou]/gi) || []).length;
    vowelCounts.value[index] = count;
  };
  const highlightField = (value: string) => {
    return searchText.value && value.includes(searchText.value);
  };
  
  const highlightSearch = () => {
    // Trigger reactivity for the highlight mechanism
  };
  
  const searchFieldHighlighted = computed(() => {
    return fields.some(field => field.value.includes(searchText.value));
  });
</script>

<template>
  <div class="dynamic-form">
    <label>
      Search: 
      <input
        type="text"
        v-model="searchText"
        @input="highlightSearch"
        placeholder="Search..."
        :class="{highlight: searchFieldHighlighted}"
      />
    </label>
    <form @submit.prevent>
      <div class="form">
        <div v-for="(field, index) in fields" :key="field.id" class="form-field">
          <input
            type="text"
            v-model="field.value"
            @input="updateVowelCount(index)"
            :class="{highlight: highlightField(field.value)}"
          />
          <span>{{ vowelCounts[index] }} vowels</span>
          <button class="remove-field" type="button" @click="removeField(index)" v-if="fields.length > 1">X</button>
        </div>
      </div>
      <button type="button" @click="addField" class="add-field" :disabled="fields.length >= 10">Add Field</button>
    </form>
  </div>
</template>
  
  <style scoped>
  .form {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
  }
  .form-field {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 10px;
    border: 1px salmon solid;
  }
  
  input {
    margin-right: 10px;
  }
  
  button {
    margin-left: 10px;
  }
  
  .highlight {
    background-color: rgba(0, 255, 0, 0.5);
  }
  </style>
  
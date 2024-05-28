import { mount, VueWrapper } from '@vue/test-utils';
import DynamicForm from "components/DynamicForm.vue";

describe('DynamicForm.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(DynamicForm);
  });

  it('renders three initial input fields', () => {
    const inputFields = wrapper.findAll('.form-field');
    expect(inputFields).toHaveLength(3);
  });

  it('adds a new input field when the "Add Field" button is clicked', async () => {
    const addButton = wrapper.find('.add-field');
    await addButton.trigger('click');
    const inputFields = wrapper.findAll('.form-field');
    expect(inputFields).toHaveLength(4);
  });

  it('removes an input field when the "Remove" button is clicked', async () => {
    const removeButtons = wrapper.findAll('.remove-field:not([disabled])');
    await removeButtons[0].trigger('click');
    const inputFields = wrapper.findAll('.form-field');
    expect(inputFields).toHaveLength(2);
  });

  it('does not remove the last remaining input field', async () => {
    let removeButtons = wrapper.findAll('.remove-field:not([disabled])');
    removeButtons[0].trigger('click');
    removeButtons[1].trigger('click');
    removeButtons = wrapper.findAll('.remove-field');
    await removeButtons[0].trigger('click');
    const inputFields = wrapper.findAll('.form-field');

    expect(inputFields).toHaveLength(1);
  });

  it('displays the correct vowel count for each input field', async () => {
    const inputFields = wrapper.findAll('.form-field');
    await inputFields[0].find('input').setValue('hello');
    await inputFields[1].find('input').setValue('world');
    await inputFields[2].find('input').setValue('aeiou');
    const vowelCounts = wrapper.findAll('span');
    expect(vowelCounts[0].text()).toBe('2 vowels');
    expect(vowelCounts[1].text()).toBe('1 vowels');
    expect(vowelCounts[2].text()).toBe('5 vowels');
  });

  it('highlights input fields containing the search text', async () => {
    const inputFields = wrapper.findAll('input[type="text"]');
    await inputFields[1].setValue('hello');
    await inputFields[2].setValue('world');
    await inputFields[3].setValue('vue');
    const searchField = inputFields[0];
    await searchField.setValue('o');
    await searchField.trigger('input');
    expect(inputFields[1].classes()).toContain('highlight');
    expect(inputFields[2].classes()).toContain('highlight');
    expect(inputFields[3].classes()).not.toContain('highlight');
  });

  it('highlights the search field if it matches any input field text', async () => {
    const inputFields = wrapper.findAll('input[type="text"]');
    await inputFields[1].setValue('hello');
    await inputFields[2].setValue('world');
    await inputFields[3].setValue('vue');
    const searchField = inputFields[0];
    await searchField.setValue('o');
    await searchField.trigger('input');
    expect(searchField.classes()).toContain('highlight');
  });
});

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  moduleDirectories: [ "node_modules", "src" ]
}
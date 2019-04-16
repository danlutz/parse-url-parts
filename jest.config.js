const { defaults } = require('jest-config')

module.exports = {
  ...defaults,
  transformIgnorePatterns: ['.test.js', '__mocks__'],
}

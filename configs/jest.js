const jest = require("eslint-plugin-jest");

module.exports = [
  jest.configs["flat/recommended"],
  {
    rules: {
      "jest/consistent-test-it": ["error", { fn: "it" }],
    },
  },
];

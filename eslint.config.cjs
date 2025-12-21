const globals = require("globals");
const tseslint = require("typescript-eslint");

const foxglove = require(".");

module.exports = tseslint.config(
  {
    ignores: ["dist"],
  },
  ...foxglove.configs.base,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  ...foxglove.configs.typescript.map((config) => ({
    ...config,
    files: ["**/*.@(ts|tsx)"],
  })),
  ...foxglove.configs.react.map((config) => ({
    ...config,
    files: ["**/*.@(jsx|tsx)"],
  })),
  ...foxglove.configs.jest.map((config) => ({
    ...config,
    files: ["**/*.test.@(js|jsx|ts|tsx)"],
  })),
);

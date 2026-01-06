const globals = require("globals");
const tseslint = require("typescript-eslint");

const foxglove = require("./index");

const { base, typescript, react, jest } = foxglove.configs;

module.exports = tseslint.config(
  {
    ignores: ["dist"],
  },
  ...base,
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
  ...typescript.map((config) => ({
    ...config,
    files: ["**/*.@(ts|tsx)"],
  })),
  ...react.map((config) => ({
    ...config,
    files: ["**/*.@(jsx|tsx)"],
  })),
  ...jest.map((config) => ({
    ...config,
    files: ["**/*.test.@(js|jsx|ts|tsx)"],
  }))
);

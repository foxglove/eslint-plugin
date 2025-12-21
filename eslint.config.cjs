const globals = require("globals");
const tseslint = require("typescript-eslint");

const foxglove = require("./index");

/** @typedef {import("eslint").Linter.Config} Config */

const base = /** @type {Config[]} */ (foxglove.configs?.base);
const typescript = /** @type {Config[]} */ (foxglove.configs?.typescript);
const react = /** @type {Config[]} */ (foxglove.configs?.react);
const jest = /** @type {Config[]} */ (foxglove.configs?.jest);

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

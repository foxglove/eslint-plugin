// eslint.config.js
import lichtblickPlugin from "@lichtblick/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...lichtblickPlugin.configs.base,
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  },
  lichtblickPlugin.configs.typescript.map((config) => ({
    ...config,
    files: ["**/*.@(ts|tsx)"],
  })),
  lichtblickPlugin.configs.jest.map((config) => ({
    ...config,
    files: ["**/*.test.@(js|jsx|ts|tsx)"],
  })),
  lichtblickPlugin.configs.react.map((config) => ({
    ...config,
    files: ["**/*.@(jsx|tsx)"],
  }))
);

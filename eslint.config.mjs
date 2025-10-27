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

// export default defineConfig([
//   // Base JS config
//   lichtblickPlugin.configs.base,
//   // {
//   //   languageOptions: {
//   //     ecmaVersion: 2022,
//   //     sourceType: "module",
//   //   },
//   //   plugins: {
//   //     "@lichtblick": lichtblickPlugin,
//   //   },
//   // },
//   // {
//   //   files: ["**/*.ts", "**/*.tsx"],
//   //   languageOptions: {
//   //     parser: tsParser,
//   //     parserOptions: {
//   //       project: "./tsconfig.json",
//   //     },
//   //   },
//   //   ...lichtblickTs,
//   // },
// ]);

// export default defineConfig([
//   {
//     ignores: ["dist"],
//     extends: ["plugin:@lichtblick/base"],
//     env: { node: true, es2022: true },
//     parserOptions: {
//       project: "tsconfig.json",
//     },

//   },
//   ...lichtblick.configs.base,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//       },
//       parserOptions: {
//         project: "tsconfig.json",
//       },
//     },
//   },
//   ...lichtblick.configs.typescript.map((config) => ({
//     ...config,
//     files: ["**/*.@(ts|tsx)"],
//   })),
//   ...lichtblick.configs.react.map((config) => ({
//     ...config,
//     files: ["**/*.@(jsx|tsx)"],
//   })),
//   ...lichtblick.configs.jest.map((config) => ({
//     ...config,
//     files: ["**/*.test.@(js|jsx|ts|tsx)"],
//   })),
// ]);

// module.exports = {
//   extends: ["plugin:@lichtblick/base"],
//   env: { node: true, es2022: true },
//   parserOptions: {
//     project: "tsconfig.json",
//   },

//   overrides: [
//     {
//       files: ["*.ts", "*.tsx"],
//       extends: ["plugin:@lichtblick/typescript"],
//       parserOptions: { project: "tsconfig.json" },
//     },
//   ],
// };

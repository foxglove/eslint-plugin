// @ts-ignore
import jest from "eslint-plugin-jest";

import lichtblickPlugin from "../plugin.mjs";

export default [
  jest.configs["flat/recommended"],
  {
    plugins: {
      "@lichtblick": lichtblickPlugin,
    },
    rules: {
      "jest/consistent-test-it": ["error", { fn: "it" }],
    },
  },
];

// base.js
import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
// import tsParser from "@typescript-eslint/parser";
import es from "eslint-plugin-es";
// import filenamesPlugin from "eslint-plugin-filenames";
import importPlugin from "eslint-plugin-import";

import lichtblickPlugin from "../plugin.mjs";

// const fixedFilenames = fixupPluginRules(filenamesPlugin);
const fixedEs = fixupPluginRules(es);

export default [
  js.configs.recommended,
  {
    plugins: {
      "@lichtblick": lichtblickPlugin,
      import: importPlugin,
      es: fixedEs,
      // filenames: {
      //   ...fixedFilenames,
      //   rules: Object.fromEntries(
      //     Object.entries(fixedFilenames.rules ?? {}).map(([ruleId, rule]) => [
      //       ruleId,
      //       {
      //         ...rule,
      //         meta: {
      //           ...rule.meta,
      //           schema: rule.meta?.schema ?? false,
      //         },
      //       },
      //     ])
      //   ),
      // },
    },
    rules: {
      // even new Safari versions do not support regexp lookbehinds
      "es/no-regexp-lookbehind-assertions": "error",

      // import plugin is slow, only enable the critical stuff
      "import/export": "error",
      "import/first": "error",
      "import/named": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-useless-path-segments": "error",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling", "index"],
          ],
        },
      ],

      // "filenames/match-exported": "error",

      // require double equal for null and undefined, triple equal everywhere else
      "@lichtblick/strict-equality": "error",
      "@lichtblick/no-return-promise-resolve": "error",
      "@lichtblick/prefer-hash-private": "error",

      // require curly braces everywhere
      curly: "error",

      // avoid eval
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",

      "no-unassigned-vars": "error",
      // unused vars must have `_` prefix
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      "no-underscore-dangle": [
        "error",
        {
          allowAfterThis: true,
        },
      ],

      // avoid TO.DO and FIX.ME comments, create a ticket to track future work
      "no-warning-comments": [
        "error",
        {
          location: "anywhere",
        },
      ],

      "no-unused-expressions": ["error", { enforceForJSX: true }],
      "no-param-reassign": "error",
      "no-useless-rename": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    },
  },
];

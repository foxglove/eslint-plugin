module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["@foxglove", "import"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
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

    // require double equal for null and undefined, triple equal everywhere else
    "@foxglove/strict-equality": "error",

    // require curly braces everywhere
    curly: "error",

    // avoid eval
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",

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
  },
};

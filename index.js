module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["file-progress", "import"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    // show progress while linting
    "file-progress/activate": 1,

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

    "no-restricted-syntax": [
      "error",
      // prefer triple equals (eqeqeq), except prefer double equals for null and undefined
      {
        selector:
          "BinaryExpression:matches([operator='=='], [operator='!=']):matches([left.type=Literal][left.raw=null], [right.type=Literal][right.raw=null])",
        message:
          'Prefer "x == undefined" or "x != undefined" to check for both null and undefined.',
      },
      {
        selector:
          "BinaryExpression:matches([operator='=='], [operator='!='])[left.type=Identifier][left.name=undefined]",
        message:
          'Prefer "x == undefined" or "x != undefined" to check for both null and undefined.',
      },
      {
        selector:
          "BinaryExpression:matches([operator='=='], [operator='!=']):not([right.type=Identifier][right.name=undefined]):not([right.type=Literal][right.raw=null])",
        message:
          'Use strict equality operators "===" and "!==", except when checking for null or undefined.',
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

    "prefer-arrow-callback": "error",
  },
};

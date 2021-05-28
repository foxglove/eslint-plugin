module.exports = {
  plugins: ["file-progress"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "file-progress/activate": 1,
    "no-console": "off",
    "no-new-func": "error",
    curly: "error",
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true,
      },
    ],
    "no-warning-comments": [
      "error",
      {
        terms: ["fixme", "xxx"],
        location: "anywhere",
      },
    ],
    "import/first": "error",
    "import/no-useless-path-segments": "error",
    "import/no-mutable-exports": "error",
    "import/newline-after-import": "error",
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
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: true,
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            importNames: ["get"],
            message: "Use optional chaining instead of lodash.get.",
          },
          {
            name: "lodash/get",
            message: "Use optional chaining instead of lodash.get.",
          },
        ],
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "MethodDefinition[kind='get'], Property[kind='get']",
        message:
          "Property getters are not allowed; prefer function syntax instead.",
      },
      {
        selector: "MethodDefinition[kind='set'], Property[kind='set']",
        message:
          "Property setters are not allowed; prefer function syntax instead.",
      },
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|debug|assert)$/]",
        message: "Unexpected property on console object was called",
      },
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
      {
        selector: "TSPrivateIdentifier",
        message: "Use private instead of #",
      },
    ],
  },
};

module.exports = {
  extends: ["./index.js"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
      ],
      parser: "@typescript-eslint/parser",
      rules: {
        // `<T>x` style assertions are not compatible with JSX code,
        // so for consistency we prefer `x as T` everywhere.
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "as",
          },
        ],

        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-confusing-non-null-assertion": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

        // unused vars must have `_` prefix
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "after-used",
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
          },
        ],

        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",

        // both sides of `+` must be either string or number
        "@typescript-eslint/restrict-plus-operands": [
          "error",
          {
            checkCompoundAssignments: true,
          },
        ],

        // require explicit boolean checks in conditionals
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowString: false,
            allowNumber: false,
          },
        ],

        // require all cases to be checked in switch statements
        "@typescript-eslint/switch-exhaustiveness-check": "error",

        "no-restricted-syntax": [
          "error",
          // #member is slow, see https://github.com/foxglove/studio/pull/430
          {
            selector: "TSPrivateIdentifier",
            message:
              "Unexpected #member syntax, prefer private keyword for performance",
          },
        ],
      },
    },
  ],
};

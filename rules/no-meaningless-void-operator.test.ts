import { ESLintUtils, TSESLint } from "@typescript-eslint/experimental-utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rule = require("./no-meaningless-void-operator") as TSESLint.RuleModule<
  "meaninglessVoidOperator" | "removeVoid",
  [{ checkNever: boolean }]
>;

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

ruleTester.run("no-meaningless-void-operator", rule, {
  valid: [
    `
(() => {})();

function foo() {}
foo(); // nothing to discard

function bar(x: number) {
  void x;
  return 2;
}
void bar(); // discarding a number
    `,
    `
function bar(x: never) {
  void x;
}
    `,
  ],
  invalid: [
    {
      code: "void (() => {})();",
      output: "(() => {})();",
      errors: [
        {
          messageId: "meaninglessVoidOperator",
          line: 1,
          column: 1,
        },
      ],
    },
    {
      code: `
function foo() {}
void foo();
      `,
      output: `
function foo() {}
foo();
      `,
      errors: [
        {
          messageId: "meaninglessVoidOperator",
          line: 3,
          column: 1,
        },
      ],
    },
    {
      options: [{ checkNever: true }],
      code: `
function bar(x: never) {
  void x;
}
      `.trimRight(),
      errors: [
        {
          messageId: "meaninglessVoidOperator",
          line: 3,
          column: 3,
          suggestions: [
            {
              messageId: "removeVoid",
              output: `
function bar(x: never) {
  x;
}
              `.trimRight(),
            },
          ],
        },
      ],
    },
  ],
});

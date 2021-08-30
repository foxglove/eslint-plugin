import { ESLintUtils, TSESLint } from "@typescript-eslint/experimental-utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rule = require("./no-boolean-parameters") as TSESLint.RuleModule<
  "booleanTrap" | "wrapParamInObject",
  [{ allowLoneParameter: boolean }]
>;

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

ruleTester.run("no-boolean-parameters", rule, {
  valid: [
    "function foo(a: string) {}",
    `
      function acceptsFoo(_: (a: boolean) => void) {}  // eslint-disable-line no-boolean-parameters
      acceptsFoo((a) => {}); // ok    
    `,
    {
      code: "function foo(a: boolean) {}",
      options: [{ allowLoneParameter: true }],
    },
  ],
  invalid: [
    {
      code: "function foo(a: boolean) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "function foo({ a }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "function foo(a: boolean | undefined) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "function foo({ a }: { a: boolean | undefined }) {}",
            },
          ],
        },
      ],
    },

    {
      code: "function foo(a: boolean = false) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a = false }" },
              output: "function foo({ a = false }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "function foo(a = true) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a = true }" },
              output: "function foo({ a = true }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "function foo(a?: false) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "function foo({ a }: { a?: false }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "function foo(a: boolean | undefined = false) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a = false }" },
              output:
                "function foo({ a = false }: { a: boolean | undefined }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "const foo = function (a: boolean) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "const foo = function ({ a }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "type B = boolean; function foo(a: B) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'foo'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "type B = boolean; function foo({ a }: { a: B }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "((a: boolean) => {})",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: `` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "(({ a }: { a: boolean }) => {})",
            },
          ],
        },
      ],
    },
    {
      code: "({ x(a: boolean) {} })",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "({ x({ a }: { a: boolean }) {} })",
            },
          ],
        },
      ],
    },
    {
      code: "({ x: (a: boolean) => {} })",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "({ x: ({ a }: { a: boolean }) => {} })",
            },
          ],
        },
      ],
    },
    {
      code: "function x(a: boolean) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "function x({ a }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "async function x(a: boolean) {}",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "async function x({ a }: { a: boolean }) {}",
            },
          ],
        },
      ],
    },
    {
      code: "class C { x(a: boolean) {} }",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "class C { x({ a }: { a: boolean }) {} }",
            },
          ],
        },
      ],
    },
    {
      code: "class C { x?: (a: boolean) => void; }",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "class C { x?: ({ a }: { a: boolean }) => void; }",
            },
          ],
        },
      ],
    },
    {
      code: "abstract class C { abstract x(a: boolean): void; }",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output:
                "abstract class C { abstract x({ a }: { a: boolean }): void; }",
            },
          ],
        },
      ],
    },
    {
      code: "type T = { x?: (a: boolean) => void; }",
      errors: [
        {
          messageId: "booleanTrap",
          data: { paramInfo: ` 'a'`, funcInfo: ` to 'x'` },
          suggestions: [
            {
              messageId: "wrapParamInObject",
              data: { pattern: "{ a }" },
              output: "type T = { x?: ({ a }: { a: boolean }) => void; }",
            },
          ],
        },
      ],
    },
  ],
});

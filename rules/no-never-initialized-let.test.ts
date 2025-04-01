import { RuleTester } from "@typescript-eslint/rule-tester";
import { TSESLint } from "@typescript-eslint/utils";

const rule =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("./no-never-initialized-let") as TSESLint.RuleModule<"letNeverInitialized">;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.test.json",
    },
  },
});

ruleTester.run("no-never-initialized-let", rule, {
  valid: [
    /* ts */ `
const x = undefined;
let y = undefined;
let z: number | undefined = undefined;
let a = x, b = y;

declare let c: string | undefined;

const foo = (two: string): void => {
  let one: string | undefined;
  if (one !== two) {
    one = two;
  }
}
`,
  ],
  invalid: [
    {
      code: /* ts */ `
let x;
let y: number;
let z: number | undefined;
let a = x, b;
      `.trim(),
      errors: [
        {
          messageId: "letNeverInitialized",
          line: 1,
          column: 5,
        },
        {
          messageId: "letNeverInitialized",
          line: 2,
          column: 5,
        },
        {
          messageId: "letNeverInitialized",
          line: 3,
          column: 5,
        },
        {
          messageId: "letNeverInitialized",
          line: 4,
          column: 12,
        },
      ],
    },
    {
      code: /* ts */ `
const foo = (two: string): void => {
  let one: string | undefined;
  if (one === two) {}
}
      `.trim(),
      errors: [
        {
          messageId: "letNeverInitialized",
          line: 2,
          column: 7,
        },
      ],
    },
  ],
});

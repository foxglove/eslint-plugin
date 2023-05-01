import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rule = require("./prefer-hash-private") as TSESLint.RuleModule<
  "preferHash" | "rename",
  []
>;

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

ruleTester.run("prefer-hash-private", rule, {
  valid: [
    /* ts */ `
class Foo {
  #x = 42;
  #getX(): number {
    return this.#x;
  }
}
`,
  ],
  invalid: [
    {
      code: /* ts */ `
class Foo {
  private x = 42;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private _getZX(): number {
    return this.z.x;
  }
}
      `.trimEnd(),
      errors: [
        {
          messageId: "preferHash",
          line: 3,
          column: 11,
          data: { oldName: "x", newName: "#x" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#x" },
              output: /* ts */ `
class Foo {
  #x = 42;
  private z = { x: 1 };

  getX(): number {
    return this.#x;
  }

  private _getZX(): number {
    return this.z.x;
  }
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 4,
          column: 11,
          data: { oldName: "z", newName: "#z" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#z" },
              output: /* ts */ `
class Foo {
  private x = 42;
  #z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private _getZX(): number {
    return this.#z.x;
  }
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 10,
          column: 11,
          data: { oldName: "_getZX", newName: "#getZX" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#getZX" },
              output: /* ts */ `
class Foo {
  private x = 42;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  #getZX(): number {
    return this.z.x;
  }
}
              `.trimEnd(),
            },
          ],
        },
      ],
    },
  ],
});

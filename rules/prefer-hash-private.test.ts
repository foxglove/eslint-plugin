import { RuleTester } from "@typescript-eslint/rule-tester";
import { TSESLint } from "@typescript-eslint/utils";

import rawRule from "./prefer-hash-private.cjs";

const rule = rawRule as unknown as TSESLint.RuleModule<"preferHash" | "rename">;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: "./tsconfig.test.json",
    },
  },
});

ruleTester.run("prefer-hash-private", rule, {
  valid: [
    /* ts */ `
class Foo {
  #x = 42;
  static #y = 1;
  #getX(): number {
    return this.#x;
  }
  static #getY(): number {
    return this.#y;
  }
  private constructor() {}
}
`,
  ],
  invalid: [
    {
      code: /* ts */ `
class Foo {
  private x = 42;
  private static y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private static getY(): number {
    return this.y;
  }

  private _getZX(): number {
    return this.z.x;
  }

  private get zx(): number {
    return this.z.x;
  }

  private constructor() {}
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
  private static y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.#x;
  }

  private static getY(): number {
    return this.y;
  }

  private _getZX(): number {
    return this.z.x;
  }

  private get zx(): number {
    return this.z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 4,
          column: 18,
          data: { oldName: "y", newName: "#y" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#y" },
              output: /* ts */ `
class Foo {
  private x = 42;
  static #y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private static getY(): number {
    return this.#y;
  }

  private _getZX(): number {
    return this.z.x;
  }

  private get zx(): number {
    return this.z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 5,
          column: 11,
          data: { oldName: "z", newName: "#z" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#z" },
              output: /* ts */ `
class Foo {
  private x = 42;
  private static y = 1;
  #z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private static getY(): number {
    return this.y;
  }

  private _getZX(): number {
    return this.#z.x;
  }

  private get zx(): number {
    return this.#z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 11,
          column: 18,
          data: { oldName: "getY", newName: "#getY" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#getY" },
              output: /* ts */ `
class Foo {
  private x = 42;
  private static y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  static #getY(): number {
    return this.y;
  }

  private _getZX(): number {
    return this.z.x;
  }

  private get zx(): number {
    return this.z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 15,
          column: 11,
          data: { oldName: "_getZX", newName: "#getZX" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#getZX" },
              output: /* ts */ `
class Foo {
  private x = 42;
  private static y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private static getY(): number {
    return this.y;
  }

  #getZX(): number {
    return this.z.x;
  }

  private get zx(): number {
    return this.z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
        {
          messageId: "preferHash",
          line: 19,
          column: 15,
          data: { oldName: "zx", newName: "#zx" },
          suggestions: [
            {
              messageId: "rename",
              data: { newName: "#zx" },
              output: /* ts */ `
class Foo {
  private x = 42;
  private static y = 1;
  private z = { x: 1 };

  getX(): number {
    return this.x;
  }

  private static getY(): number {
    return this.y;
  }

  private _getZX(): number {
    return this.z.x;
  }

  get #zx(): number {
    return this.z.x;
  }

  private constructor() {}
}
              `.trimEnd(),
            },
          ],
        },
      ],
    },
  ],
});

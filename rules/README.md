## Rules

The following rules are provided by `@foxglove/eslint-plugin`. You may need to enable the plugin by adding `@foxglove` in the `plugins` section of your eslint configuration.

**Key:** 🔧 = fixable, 💡 = has suggestions, 💭 = requires type information (TypeScript only)

### [`@foxglove/no-boolean-parameters`](./no-boolean-parameters.js) 💭 🔧

Prohibit boolean parameters to functions, including optional parameters and default values.

In languages without [argument labels](https://docs.swift.org/swift-book/LanguageGuide/Functions.html), boolean parameters often point to an API anti-pattern called the [**boolean trap**](https://ariya.io/2011/08/hall-of-api-shame-boolean-trap). For example, with a function like `repaint(immediate: boolean)`, a reader looking at a call site sees `repaint(true);` and loses key context that `true` means the repaint should be `immediate`.

This rule does currently allow unions of booleans and other types like `value: boolean | number`. This approach was chosen because some common library types like `React.ReactNode` are unions of primitives, and it would be too noisy to prohibit all of these.

Examples of **incorrect** code for this rule:

```ts
function draw(immediate: boolean) {}
const draw = (immediate?: boolean) => {};
const draw = (immediate = false) => {};
```

Examples of **correct** code for this rule:

```ts
function draw({ immediate }: { immediate: boolean }) {}
const draw = ({ immediate }: { immediate?: boolean }) => {};
const draw = ({ immediate = false }: { immediate: boolean }) => {};
```

### Options

This rule accepts a single object option with the following default configuration:

```json
{
  "@foxglove/no-boolean-parameters": ["error", { "allowLoneParameter": false }]
}
```

- `allowLoneParameter: true` will not report an error if a boolean parameter is the **only** parameter to a function.

### [`@foxglove/no-never-initialized-let`](./no-never-initialized-let.js)

Disallow variable declarations that use `let` but have no intitial value and are never assigned. These variables will always be `undefined` and are likely a programmer error.

The builtin [prefer-const](https://eslint.org/docs/latest/rules/prefer-const) rule doesn't flag these because they lack an initializer. Otherwise, they could be flagged by [init-declarations](https://eslint.org/docs/latest/rules/init-declarations), but this rule is mostly stylistic and has some implications for TypeScript type inference & refinement. (See [eslint/eslint#19581](https://github.com/eslint/eslint/issues/19581) & [microsoft/TypeScript#61496](https://github.com/microsoft/TypeScript/issues/61496) for more discussion.)

Examples of **incorrect** code for this rule:

```ts
let prevX;
let prevY;
if (x !== prevX) {
  prevX = x;
}
if (y !== prevY) {
  prevX = x; // typo, should have been Y
}
```

Examples of **correct** code for this rule:

```ts
let prevX;
let prevY;
if (x !== prevX) {
  prevX = x;
}
if (y !== prevY) {
  prevY = y;
}
```

### [`@foxglove/no-return-promise-resolve`](./no-return-promise-resolve.js) 🔧

Disallow returning `Promise.resolve(...)` or `Promise.reject(...)` inside an async function. This is redundant since an async function will always return a Promise — use `return` or `throw` directly instead.

Examples of **incorrect** code for this rule:

```ts
async function foo() {
  return Promise.resolve(0);
}
const bar = async function () {
  return Promise.resolve(9);
};
async () => Promise.resolve(3);
async () => Promise.reject(new Error("boom"));
```

Examples of **correct** code for this rule:

```ts
async function foo() {
  return 0;
}
const bar = async function () {
  return 9;
};
async () => 3;
async () => {
  throw new Error("boom");
};
```

### [`@foxglove/prefer-hash-private`](./prefer-hash-private.js) 💡

Prefer using [private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) instead of the TypeScript `private` keyword. In contrast with `private x`, which is a compile-time-only feature of TypeScript, `#x` is _truly_ private (cannot be accessed at runtime from outside the class using subscript notation) and cannot accidentally interfere with superclass properties.

One downside worth noting is that private fields can interfere with `Proxy` behavior:

- https://lea.verou.me/2023/04/private-fields-considered-harmful/
- https://github.com/tc39/proposal-class-fields/issues/106

Examples of **incorrect** code for this rule:

```ts
class Foo {
  private x = 3;

  private go() {
    this.x = 4;
  }
}
```

Examples of **correct** code for this rule:

```ts
class Foo {
  #x = 3;

  #go() {
    this.#x = 4;
  }
}
```

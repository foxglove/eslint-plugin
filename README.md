# @foxglove/eslint-plugin

[![npm package](https://img.shields.io/npm/v/@foxglove/eslint-plugin)](https://www.npmjs.com/package/@foxglove/eslint-plugin)

Foxglove default eslint configuration & rules.

Please err on the side of conservative changes to this repo - multiple Foxglove projects should adopt a change before making it a default.

## Installation

The following configurations are available:

- `plugin:@foxglove/base` (automatically imported by other configurations)
- `plugin:@foxglove/react`
- `plugin:@foxglove/typescript`

**Typescript + React Example**

```sh
yarn add -D \
    eslint \
    @foxglove/eslint-plugin \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-config-prettier \
    eslint-plugin-file-progress \
    eslint-plugin-import \
    eslint-plugin-prettier \
    eslint-plugin-react \
    eslint-plugin-react-hooks
```

In your `.eslintrc.js`:

```js
module.exports = {
  extends: ["plugin:@foxglove/react", "plugin:@foxglove/typescript"],
  parserOptions: {
    project: "tsconfig.json",
  },
};
```

## Releasing

You must use npm 7+ (not yarn) to test this repo locally, due to the self link in `package.json`.

```sh
npm version [major|minor|patch]
git push && git push --tags
```

In the GitHub UI, `Edit tag` then `Publish release`, and it will be published to NPM automatically.

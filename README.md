# @foxglove/eslint-config

[![npm package](https://img.shields.io/npm/v/@foxglove/eslint-config)](https://www.npmjs.com/package/@foxglove/eslint-config)

Foxglove default eslint configuration.

Err on the side of conservative changes to this repo - multiple Foxglove projects should successfully adopt a change before making it a default.

## Installation

The following configurations are available:

- `@foxglove/eslint-config` (automatically imported)
- `@foxglove/eslint-config/react`
- `@foxglove/eslint-config/typescript`

**Typescript + React Example**

```sh
yarn add -D \
    eslint \
    @foxglove/eslint-config \
    @typescript-eslint/eslint-plugin
    @typescript-eslint/parser
    eslint-config-prettier \
    eslint-plugin-file-progress \
    eslint-plugin-import \
    eslint-plugin-prettier
    eslint-plugin-react
    eslint-plugin-react-hooks
```

In your `.eslintrc.js`:

```js
module.exports = {
  extends: [
    "@foxglove/eslint-config/react",
    "@foxglove/eslint-config/typescript",
  ],
  parserOptions: {
    project: "tsconfig.json",
  },
};
```

## Releasing

```sh
npm version [major|minor|patch]
git push && git push --tags
```

In the GitHub UI, `Edit tag` then `Publish release`, and it will be published to NPM automatically.

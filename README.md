# @lichtblick/eslint-plugin

[![npm package](https://img.shields.io/npm/v/@lichtblick/eslint-plugin)](https://www.npmjs.com/package/@lichtblick/eslint-plugin)

Lichtblick default eslint configuration & rules.

Please err on the side of conservative changes to this repo - multiple Lichtblick projects should adopt a change before making it a default.

## Rules

See [rules/README.md](rules/README.md) for details on each rule.

## Installation

The following configurations are available:

- `plugin:@lichtblick/base`
- `plugin:@lichtblick/jest`
- `plugin:@lichtblick/react`
- `plugin:@lichtblick/typescript`

**Typescript + React Example**

```sh
yarn add -D \
    @lichtblick/eslint-plugin \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint \
    eslint-config-prettier \
    eslint-plugin-es \
    eslint-plugin-filenames \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-prettier \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    prettier
```

In your `.eslintrc.js`:

```js
module.exports = {
  extends: [
    "plugin:@lichtblick/base",
    "plugin:@lichtblick/jest",
    "plugin:@lichtblick/react",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@lichtblick/typescript"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
};
```

You can add `"plugin:@lichtblick/typescript"` to the top level `extends` instead of using `overrides` if your project contains no `.js` files.

## License

@lichtblick/eslint-plugin is released under the [MIT License](/LICENSE.md).

## Releasing

**Note**: You must use npm 7+ (not yarn) to test this repo locally, due to the self link in `package.json`.

```sh
tag=$(npm version minor) && echo "$tag"
git push && git push origin "$tag"
```


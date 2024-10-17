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

## License Header Rule Configuration

To use the license-header rule, your project must specify the license type in the ESLint configuration file (`.eslintrc`). This is done by defining an object with a `licenseType` attribute that matches your project's license.

Here’s an example of how to configure it:

```js
rules:
  "@lichtblick/license-header": ["error", {licenseType: "MPL-2.0"}]
```

In this example, the `licenseType` is set to "MPL-2.0", but you should replace it with the appropriate license type for your project (e.g., "MIT", "Apache-2.0").


## License

@lichtblick/eslint-plugin is released under the [MIT License](/LICENSE.md).

## Releasing

**Note**: You must use npm 7+ (not yarn) to test this repo locally, due to the self link in `package.json`.

```sh
tag=$(npm version minor) && echo "$tag"
git push && git push origin "$tag"
```

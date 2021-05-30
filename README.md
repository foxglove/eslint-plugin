# @foxglove/eslint-config

[![npm package](https://img.shields.io/npm/v/@foxglove/eslint-config)](https://www.npmjs.com/package/@foxglove/eslint-config)

Foxglove default eslint configuration.

Err on the side of conservative changes to this repo - multiple Foxglove projects should successfully adopt a change before making it a default.

## Releasing

```sh
npm version [major|minor|patch]
git push && git push --tags
```

In the GitHub UI, `Edit tag` then `Publish release`, and it will be published to NPM automatically.

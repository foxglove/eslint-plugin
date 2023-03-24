module.exports = {
  rules: {
    "license-header": require("./rules/license-header"),
    "no-private-identifier": require("./rules/no-private-identifier"),
    "strict-equality": require("./rules/strict-equality"),
    "no-return-promise-resolve": require("./rules/no-return-promise-resolve"),
    "no-boolean-parameters": require("./rules/no-boolean-parameters"),
    "no-restricted-imports": require("./rules/no-restricted-imports"),
  },
  configs: {
    base: require("./configs/base"),
    "frontend-mui-recommended": require("./configs/frontend-mui-recommended"),
    jest: require("./configs/jest"),
    react: require("./configs/react"),
    typescript: require("./configs/typescript"),
  },
};

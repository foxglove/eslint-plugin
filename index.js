module.exports = {
  rules: {
    "license-header": require("./rules/license-header"),
    "no-private-identifier": require("./rules/no-private-identifier"),
    "strict-equality": require("./rules/strict-equality"),
    "no-meaningless-void-operator": require("./rules/no-meaningless-void-operator"),
    "no-return-promise-resolve": require("./rules/no-return-promise-resolve"),
  },
  configs: {
    base: require("./configs/base"),
    jest: require("./configs/jest"),
    react: require("./configs/react"),
    typescript: require("./configs/typescript"),
  },
};

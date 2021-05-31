module.exports = {
  rules: {
    "strict-equality": require("./rules/strict-equality"),
    "no-private-identifier": require("./rules/no-private-identifier"),
  },
  configs: {
    base: require("./configs/base"),
    react: require("./configs/react"),
    typescript: require("./configs/typescript"),
  },
};

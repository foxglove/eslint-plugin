module.exports = {
  extends: ["plugin:@foxglove/base"],
  env: { node: true },
  parserOptions: {
    project: "tsconfig.json",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@foxglove/typescript"],
      parserOptions: { project: "tsconfig.json" },
    },
  ],
};

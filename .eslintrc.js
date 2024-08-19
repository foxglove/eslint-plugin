module.exports = {
  extends: ["plugin:@lichtblick/base"],
  env: { node: true, es2022: true },
  parserOptions: {
    project: "tsconfig.json",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@lichtblick/typescript"],
      parserOptions: { project: "tsconfig.json" },
    },
  ],
};

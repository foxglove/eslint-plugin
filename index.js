const plugin = require("./plugin");

/** @typedef {import("eslint").Linter.Config[]} Configs */

/**
 * @type {import("eslint").ESLint.Plugin & {
 *   configs: { base: Configs; jest: Configs; react: Configs; typescript: Configs }
 * }}
 */
module.exports = {
  // Rules are stored in a separate file to avoid circular dependency
  ...plugin,
  configs: {
    base: require("./configs/base"),
    jest: require("./configs/jest"),
    react: require("./configs/react"),
    typescript: require("./configs/typescript"),
  },
};

import base from "./configs/base.mjs";
import jest from "./configs/jest.mjs";
import react from "./configs/react.mjs";
import typescript from "./configs/typescript.mjs";
import plugin from "./plugin.mjs";

export default {
  ...plugin,
  configs: {
    base,
    jest,
    react,
    typescript,
  },
};

module.exports = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/no-unused-prop-types": "error",
    "react/prop-types": "off", // slow, unnecessary with typescript
  },
};

module.exports = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/no-unused-prop-types": "error",

    // this rule is slow, and unnecessary with typescript
    "react/prop-types": "off",

    // require rel="noopener" or rel="noreferrer" with target="_blank" for security
    "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
  },
};

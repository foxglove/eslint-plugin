module.exports = {
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/no-unused-prop-types": "error",

    // unnecessary to import React with next.js and common patterns
    "react/react-in-jsx-scope": "off",

    // this rule is slow, and unnecessary with typescript
    "react/prop-types": "off",

    // require rel="noopener" or rel="noreferrer" with target="_blank" for security
    "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
  },
};

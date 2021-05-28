module.exports = {
  env: {
    browser: true,
  },
  plugins: ["react", "react-hooks"],
  extends: ["plugin:react/recommended"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unused-prop-types": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAsync(?!AppConfigurationValue))",
      },
    ],
  },
};

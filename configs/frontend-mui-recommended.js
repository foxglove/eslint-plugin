module.exports = {
  rules: {
    // deprecated mui/styled in our frontend code in favor of tss-react/mui
    "@foxglove/no-restricted-imports": [
      "error",
      {
        name: "@mui/material",
        importNames: ["styled"],
        message:
          "@mui/styled has performance implications. Use tss-react/mui instead.",
      },
      {
        name: "@mui/styles",
        message:
          "@mui/styles has performance implications. Use tss-react/mui instead.",
      },
      {
        name: "@mui/material/styles/styled",
        message:
          "@mui/styled has performance implications. Use tss-react/mui instead.",
      },
      {
        name: "@emotion/styled",
        message:
          "@emotion/styled has performance implications. Use tss-react/mui instead.",
      },
    ],
  },
};

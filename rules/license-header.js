// A custom eslint rule checking for the existence of an MPL license header,
// while allowing certain prefixes that cannot be moved below the license header.

const ALLOWED_PREFIX_LINES = ["/** @jest-environment jsdom */"];

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          licenseType: {
            type: "string",
            descritpion:
              "Type of license that should be displayed on the header.",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      wrongHeaderError:
        "There is an error with the file header. Please check if the header exists or if there is a mistake in it.",
      missingTypeOfLicenseError:
        "Please specify the license type in the .eslintrc configuration. For more information, refer to our documentation: https://github.com/Lichtblick-Suite/eslint-plugin?tab=readme-ov-file#lichtblickeslint-plugin",
    },
  },

  create: (context) => {
    const options = context.options[0];
    if (!options || !options.licenseType) {
      context.report({
        loc: { line: 0, column: 0 },
        messageId: "missingTypeOfLicenseError",
      });
      return {};
    }
    const licenseType = options.licenseType;
    const LICENSE_HEADER = `
// SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: ${licenseType}
    `.trim();

    return {
      Program: () => {
        const source = context.getSourceCode().getText();
        const headerIndex = source.indexOf(LICENSE_HEADER);
        const prefixLines = source.substring(0, headerIndex).trim().split("\n");
        const prefixLinesAreValid = prefixLines.every(
          (line) => line === "" || ALLOWED_PREFIX_LINES.includes(line)
        );
        if (headerIndex === -1 || !prefixLinesAreValid) {
          context.report({
            messageId: "wrongHeaderError",
            loc: { start: 0, end: +source.indexOf("\n") + 1 },
            fix: () => {
              return { range: [0, 0], text: LICENSE_HEADER + "\n\n" };
            },
          });
        }
      },
    };
  },
};

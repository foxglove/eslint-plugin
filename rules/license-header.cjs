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
    defaultOptions: [],
    messages: {
      wrongHeaderError:
        "There is an error with the file header. Please check if the header exists or if there is a mistake in it.",
      missingTypeOfLicenseError:
        "Please specify the license type in the .eslintrc configuration. For more information, refer to our documentation: https://github.com/Lichtblick-Suite/eslint-plugin?tab=readme-ov-file#lichtblickeslint-plugin",
      prefixLinesError:
        "There are lines before the header that are not allowed. Please move them below the header.",
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
    const currentYear = new Date().getFullYear().toString();

    const EXPECTED_HEADER = `// SPDX-FileCopyrightText: Copyright (C) 2023-${currentYear} Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>\n// SPDX-License-Identifier: ${licenseType}`;

    const HEADER_REGEX =
      /\/\/ SPDX-FileCopyrightText: Copyright \(C\) 2023-\d{4} Bayerische Motoren Werke Aktiengesellschaft \(BMW AG\)<lichtblick@bmwgroup\.com>\n\/\/ SPDX-License-Identifier: (.+)/;

    return {
      Program: (node) => {
        const sourceCode = context.getSourceCode();
        const fullText = sourceCode.getText();

        const match = fullText.match(HEADER_REGEX);

        const headerStartIndex = match?.index ?? -1;
        const headerEndIndex = match ? headerStartIndex + match[0].length : -1;

        const preHeaderText =
          headerStartIndex > -1
            ? fullText.slice(0, headerStartIndex).trim()
            : fullText.trim();
        const prefixLines = preHeaderText.split("\n").filter(Boolean);
        const prefixLinesAreValid = prefixLines.every((line) =>
          ALLOWED_PREFIX_LINES.includes(line.trim())
        );

        const isHeaderCorrect =
          match &&
          match[1] === licenseType &&
          match[0].includes(currentYear.toString());

        if (!prefixLinesAreValid) {
          context.report({
            node,
            messageId: "prefixLinesError",
            fix: (fixer) => {
              const fixes = [];
              if (match) {
                fixes.push(
                  fixer.removeRange([headerStartIndex, headerEndIndex])
                );
              }
              fixes.push(
                fixer.insertTextBeforeRange([0, 0], EXPECTED_HEADER + "\n\n")
              );
              return fixes;
            },
          });
          return;
        }
        if (!isHeaderCorrect) {
          context.report({
            node,
            messageId: "wrongHeaderError",
            fix: (fixer) => {
              return fixer.replaceTextRange(
                [headerStartIndex, headerEndIndex],
                EXPECTED_HEADER
              );
            },
          });
        }
      },
    };
  },
};

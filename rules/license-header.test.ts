// SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MIT

import { RuleTester } from "@typescript-eslint/rule-tester";
import { TSESLint } from "@typescript-eslint/utils";

// should be the same of LICENSE_HEADER defined on license-header.js file.
const mplLicense = "MPL-2.0";
const mitLicense = "MIT";
const noLicense = "";
const currentYear = new Date().getFullYear().toString();

function createHeader(license: string, year?: string) {
  return (
    `// SPDX-FileCopyrightText: Copyright (C) 2023-${year} Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>\n` +
    `// SPDX-License-Identifier: ${license}`
  ).trimEnd();
}

const rule =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("./license-header") as TSESLint.RuleModule<
    "wrongHeaderError" | "missingTypeOfLicenseError" | "prefixLinesError",
    Array<Record<string, string>>
  >;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

const validLichtblickHeader = `
${createHeader(mitLicense, currentYear)}

// Rest of file
`;

const validLichtblickHeaderWithSpaces = `



${createHeader(mplLicense, currentYear)}



`;

const validLichtblickHeaderWithSpacesWithJsdom = `
/** @jest-environment jsdom */

${createHeader(mplLicense, currentYear)}
`;

const invalidLichtblickHeaderEmpty = ``;

const invalidLichtblickHeaderOlder = `
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
`;

const invalidLichtblickHeaderRandom = `
var a = 1
var b = 2
console.log(1 + 2)
`;

const invalidLichtblickHeaderWithMissingTypeOfLicense = `
${createHeader(noLicense, currentYear)}

`;

const invalidLichtblickHeaderWithWrongTypeOfLicense =
  `${createHeader(mplLicense, currentYear)}` + "\n\n";

const invalidLichtblickHeaderWrongYear =
  `${createHeader(mplLicense, "2024")}` + "\n\n";

const importCode = "import React from 'react';\n";

const invalidLichtblickHeaderDuplicated =
  `${importCode}` + `${createHeader(mplLicense, currentYear)}` + "\n\n";

ruleTester.run("check-license-header", rule, {
  valid: [
    {
      code: validLichtblickHeader,
      options: [{ licenseType: "MIT" }],
    },
    {
      code: validLichtblickHeaderWithSpaces,
      options: [{ licenseType: "MPL-2.0" }],
    },
    {
      code: validLichtblickHeaderWithSpacesWithJsdom,
      options: [{ licenseType: "MPL-2.0" }],
    },
  ],

  // Test if the lint fix were successfull, adding the LICENSE_HEADER followed by two empty lines
  invalid: [
    {
      code: invalidLichtblickHeaderEmpty,
      options: [{ licenseType: "MPL-2.0" }],
      errors: [{ messageId: "wrongHeaderError" }],
      output:
        createHeader(mplLicense, currentYear) + invalidLichtblickHeaderEmpty,
    },
    {
      code: invalidLichtblickHeaderOlder,
      options: [{ licenseType: "MPL-2.0" }],
      errors: [{ messageId: "prefixLinesError" }],
      output:
        createHeader(mplLicense, currentYear) +
        "\n\n" +
        invalidLichtblickHeaderOlder,
    },
    {
      code: invalidLichtblickHeaderRandom,
      options: [{ licenseType: "MPL-2.0" }],
      errors: [{ messageId: "prefixLinesError" }],
      output:
        createHeader(mplLicense, currentYear) +
        "\n\n" +
        invalidLichtblickHeaderRandom,
    },
    {
      code: invalidLichtblickHeaderWithMissingTypeOfLicense,
      options: [],
      errors: [{ messageId: "missingTypeOfLicenseError" }],
    },
    {
      code: invalidLichtblickHeaderWithWrongTypeOfLicense,
      options: [{ licenseType: "MIT" }],
      errors: [{ messageId: "wrongHeaderError" }],
      output: createHeader(mitLicense, currentYear) + "\n\n",
    },
    {
      code: invalidLichtblickHeaderWrongYear,
      options: [{ licenseType: "MPL-2.0" }],
      errors: [{ messageId: "wrongHeaderError" }],
      output: createHeader(mplLicense, currentYear) + "\n\n",
    },
    {
      code: invalidLichtblickHeaderDuplicated,
      options: [{ licenseType: "MPL-2.0" }],
      errors: [{ messageId: "prefixLinesError" }],
      output:
        createHeader(mplLicense, currentYear) +
        "\n\n" +
        `${importCode}` +
        "\n\n",
    },
  ],
});

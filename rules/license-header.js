const ALLOWED_PREFIX_LINES = ["/** @jest-environment jsdom */"];
const NEW_FILE_LICENSE_HEADER = `
/* SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
* SPDX-FileCopyrightText: Copyright Foxglove Technologies Inc.
* SPDX-License-Identifier: MPL-2.0
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/
*/
`.trim();

const MODIFIED_FILE_LICENSE_HEADER = `
/* SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
* SPDX-License-Identifier: MPL-2.0
*
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/
*/
`.trim();

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
  },

  create: (context) => {
    return {
      Program: () => {
        const source = context.getSourceCode().getText();
        const isNewFileHeaderPresent =
          source.indexOf(NEW_FILE_LICENSE_HEADER) !== -1;
        const isModifiedFileHeaderPresent =
          source.indexOf(MODIFIED_FILE_LICENSE_HEADER) !== -1;
        const headerIndex = source.indexOf(MODIFIED_FILE_LICENSE_HEADER);
        const prefixLines = source
          .substring(0, Math.max(0, source.indexOf("\n")))
          .trim()
          .split("\n");
        const prefixLinesAreValid = prefixLines.every(
          (line) => line === "" || ALLOWED_PREFIX_LINES.includes(line)
        );

        if (!isNewFileHeaderPresent && !isModifiedFileHeaderPresent) {
          context.report({
            message: "Missing license header for a new file",
            loc: { start: 0, end: 0 },
            fix: (fixer) =>
              fixer.insertTextBeforeRange(
                [0, 0],
                NEW_FILE_LICENSE_HEADER + "\n\n"
              ),
          });
        } else if (
          !prefixLinesAreValid ||
          (isModifiedFileHeaderPresent && headerIndex === -1)
        ) {
          context.report({
            message: "Missing or incorrect license header for a modified file",
            loc: { start: 0, end: 0 },
            fix: (fixer) =>
              fixer.insertTextBeforeRange(
                [0, 0],
                MODIFIED_FILE_LICENSE_HEADER + "\n\n"
              ),
          });
        }
      },
    };
  },
};

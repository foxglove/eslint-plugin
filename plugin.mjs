import licenseHeader from "./rules/license-header.cjs";
import noBooleanParameters from "./rules/no-boolean-parameters.cjs";
import noRestrictedImports from "./rules/no-restricted-imports.cjs";
import noReturnPromiseResolve from "./rules/no-return-promise-resolve.cjs";
import preferHashPrivate from "./rules/prefer-hash-private.cjs";
import strictEquality from "./rules/strict-equality.cjs";

export default {
  rules: {
    "license-header": licenseHeader,
    "strict-equality": strictEquality,
    "no-return-promise-resolve": noReturnPromiseResolve,
    "no-boolean-parameters": noBooleanParameters,
    "no-restricted-imports": noRestrictedImports,
    "prefer-hash-private": preferHashPrivate,
  },
};

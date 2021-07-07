const { ESLintUtils } = require("@typescript-eslint/experimental-utils");
const { unionTypeParts } = require("tsutils");
const ts = require("typescript");

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
    messages: {
      meaninglessVoidOperator: `void operator shouldn't be used on {{type}}; it should convey that a return value is being ignored`,
    },
  },

  create(context, _options) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      [`UnaryExpression[operator="void"]`]: (node) => {
        const argTsNode = parserServices.esTreeNodeToTSNodeMap.get(
          node.argument
        );
        const argType = checker.getTypeAtLocation(argTsNode);
        if (
          unionTypeParts(argType).every(
            (part) =>
              part.flags & ts.TypeFlags.Void ||
              part.flags & ts.TypeFlags.Undefined ||
              part.flags & ts.TypeFlags.Never
          )
        ) {
          context.report({
            node,
            messageId: "meaninglessVoidOperator",
            data: { type: checker.typeToString(argType) },
            fix(fixer) {
              const voidToken = parserServices.esTreeNodeToTSNodeMap
                .get(node)
                .getChildAt(0);
              return fixer.removeRange([
                voidToken.getStart(),
                voidToken.getEnd(),
              ]);
            },
          });
        }
      },
    };
  },
};

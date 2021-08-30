const { ESLintUtils } = require("@typescript-eslint/experimental-utils");
const { unionTypeParts } = require("tsutils");
const ts = require("typescript");

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    messages: {
      meaninglessVoidOperator:
        "void operator shouldn't be used on {{type}}; it should convey that a return value is being ignored",
      removeVoid: "Remove 'void'",
    },
    schema: [
      {
        type: "object",
        properties: {
          checkNever: {
            type: "boolean",
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const { checkNever } = context.options?.[0] ?? [{ checkNever: false }];
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();
    const sourceCode = context.getSourceCode();

    return {
      [`UnaryExpression[operator="void"]`]: (node) => {
        const fix = (fixer) => {
          return fixer.removeRange([
            sourceCode.getTokens(node)[0].range[0],
            sourceCode.getTokens(node)[1].range[0],
          ]);
        };

        const argTsNode = parserServices.esTreeNodeToTSNodeMap.get(
          node.argument
        );
        const argType = checker.getTypeAtLocation(argTsNode);
        const unionParts = unionTypeParts(argType);
        if (
          unionParts.every(
            (part) => part.flags & (ts.TypeFlags.Void | ts.TypeFlags.Undefined)
          )
        ) {
          context.report({
            node,
            messageId: "meaninglessVoidOperator",
            data: { type: checker.typeToString(argType) },
            fix,
          });
        } else if (
          checkNever &&
          unionParts.every(
            (part) =>
              part.flags &
              (ts.TypeFlags.Void | ts.TypeFlags.Undefined | ts.TypeFlags.Never)
          )
        ) {
          context.report({
            node,
            messageId: "meaninglessVoidOperator",
            data: { type: checker.typeToString(argType) },
            suggest: [{ messageId: "removeVoid", fix }],
          });
        }
      },
    };
  },
};

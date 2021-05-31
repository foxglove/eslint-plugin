const eqeqeq = require("eslint/lib/rules/eqeqeq");
const astUtils = require("eslint/lib/rules/utils/ast-utils");

// - Prefer double equals when comparing with undefined.
// - Prefer undefined over null.
// - Prefer triple equals everywhere else.
module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
    messages: {
      unexpected: "Prefer '{{expectedOperator}}' over '{{actualOperator}}'.",
    },
  },

  create: function (context) {
    const tripleEq = eqeqeq.create(context);
    const sourceCode = context.getSourceCode();

    function isUndefinedLiteral(node) {
      return node.type === "Identifier" && node.name === "undefined";
    }

    return {
      BinaryExpression: function (node) {
        // If either side is undefined, prefer double equals
        if (isUndefinedLiteral(node.left) || isUndefinedLiteral(node.right)) {
          if (node.operator === "===" || node.operator === "!==") {
            let expectedOp = node.operator.substring(0, 2);

            const operatorToken = sourceCode.getFirstTokenBetween(
              node.left,
              node.right,
              (token) => token.value === node.operator
            );

            context.report({
              node,
              loc: operatorToken.loc,
              message: `Prefer 'x ${expectedOp} undefined' to check both null and undefined`,
            });
          }
        }

        // If either side is null, prefer undefined
        else if (
          astUtils.isNullLiteral(node.left) ||
          astUtils.isNullLiteral(node.right)
        ) {
          let expectedOp = node.operator.substring(0, 2);
          context.report({
            node,
            message: `Prefer 'x ${expectedOp} undefined' to check both null and undefined`,
          });
        }

        // Otherwise, fall through to eqeqeq rule
        // We don't need to configure it since null and undefined were already checked
        else {
          tripleEq.BinaryExpression(node);
        }
      },
    };
  },
};

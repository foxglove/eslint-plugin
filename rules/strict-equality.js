const eqeqeq = require("eslint/lib/rules/eqeqeq");
const astUtils = require("eslint/lib/rules/utils/ast-utils");

// - Prefer double equals when comparing with undefined
// - Prefer undefined over null
// - Prefer triple equals everywhere else
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
        function report(node, loc) {
          let expectedOp = node.operator.substring(0, 2);

          context.report({
            node,
            loc,
            message: `Prefer 'x ${expectedOp} undefined' to catch both null and undefined`,
          });
        }

        // If either side is undefined, prefer double equals
        if (isUndefinedLiteral(node.left) || isUndefinedLiteral(node.right)) {
          if (node.operator === "===" || node.operator === "!==") {
            const operatorToken = sourceCode.getFirstTokenBetween(
              node.left,
              node.right,
              (token) => token.value === node.operator
            );

            report(node, operatorToken.loc);
          }
        }

        // If either side is null, prefer undefined
        else if (
          astUtils.isNullLiteral(node.left) ||
          astUtils.isNullLiteral(node.right)
        ) {
          report(node, node.loc);
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

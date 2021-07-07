const eqeqeq = require("eslint/lib/rules/eqeqeq");
const { isNullLiteral } = require("eslint/lib/rules/utils/ast-utils");

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

  create(context) {
    const tripleEq = eqeqeq.create(context);
    const sourceCode = context.getSourceCode();

    function isUndefinedLiteral(node) {
      return node.type === "Identifier" && node.name === "undefined";
    }

    return {
      BinaryExpression: (node) => {
        function preferDoubleEqual(node, loc, literal) {
          let expectedOp = node.operator.substring(0, 2);

          context.report({
            node,
            loc,
            message: `Prefer 'x ${expectedOp} ${literal}' to catch both null and undefined`,
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

            preferDoubleEqual(node, operatorToken.loc, "undefined");
          }
        }

        // If either side is null, prefer double equals
        else if (isNullLiteral(node.left) || isNullLiteral(node.right)) {
          if (node.operator === "===" || node.operator === "!==") {
            const operatorToken = sourceCode.getFirstTokenBetween(
              node.left,
              node.right,
              (token) => token.value === node.operator
            );

            preferDoubleEqual(node, operatorToken.loc, "null");
          }
        }

        // Otherwise, fall through to `eqeqeq` rule
        // We don't need to configure it since null and undefined were already checked
        else {
          tripleEq.BinaryExpression(node);
        }
      },
    };
  },
};

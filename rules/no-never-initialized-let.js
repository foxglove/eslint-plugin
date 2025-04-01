/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    messages: {
      letNeverInitialized:
        "`let` variable is not initialized and never assigned, so it will always be undefined. Use `const` instead.",
    },
  },
  create: (context) => {
    const { sourceCode } = context;
    return {
      [`VariableDeclaration[kind=let]:not([declare=true]) > VariableDeclarator[id.type=Identifier]:not([init])`](
        /** @type {import("estree").VariableDeclarator & { parent: import("eslint").Rule.Node }} */
        node
      ) {
        for (const variable of sourceCode.getDeclaredVariables(node)) {
          for (const reference of variable.references) {
            if (reference.isWrite()) {
              return;
            }
          }
        }
        context.report({
          node,
          messageId: "letNeverInitialized",
        });
      },
    };
  },
};

const { ESLintUtils } = require("@typescript-eslint/experimental-utils");
const { unionTypeParts } = require("tsutils");
const ts = require("typescript");

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
  },

  create(context, _options) {
    const sourceCode = context.getSourceCode();
    const { esTreeNodeToTSNodeMap, program } =
      ESLintUtils.getParserServices(context);
    const checker = program.getTypeChecker();
    return {
      ":function > AssignmentPattern.params, :function > [typeAnnotation].params, TSFunctionType > [typeAnnotation].params":
        (param) => {
          const tsNode = esTreeNodeToTSNodeMap.get(param);
          const type = checker.getTypeAtLocation(tsNode);
          const isBoolean = unionTypeParts(type).every(
            (part) =>
              part.flags &
              (ts.TypeFlags.BooleanLike |
                ts.TypeFlags.Void |
                ts.TypeFlags.Undefined |
                ts.TypeFlags.Null |
                ts.TypeFlags.Never)
          );
          if (!isBoolean) {
            return;
          }
          let pattern;
          let typeAnnotation;
          if (
            param.type === "AssignmentPattern" &&
            param.left.type === "Identifier"
          ) {
            pattern = `{ ${param.left.name} = ${sourceCode.getText(
              param.right
            )} }`;
            typeAnnotation = `{ ${sourceCode.getText(param.left)}${
              param.left.typeAnnotation == undefined ? ": boolean" : ""
            } }`;
          } else if (param.type === "Identifier") {
            pattern = `{ ${param.name} }`;
            typeAnnotation = `{ ${sourceCode.getText(param)}${
              param.typeAnnotation == undefined ? ": boolean" : ""
            } }`;
          }

          context.report({
            node: param,
            message: `Don't use raw boolean values as parameters; call sites will appear ambiguous (the "boolean trap")`,
            suggest:
              pattern && typeAnnotation
                ? [
                    {
                      desc: `Replace with ${pattern}`,
                      fix(fixer) {
                        return fixer.replaceText(
                          param,
                          `${pattern}: ${typeAnnotation}`
                        );
                      },
                    },
                  ]
                : undefined,
          });
        },
    };
  },
};

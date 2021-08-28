const { ESLintUtils } = require("@typescript-eslint/experimental-utils");
const { unionTypeParts } = require("tsutils");
const ts = require("typescript");

function getMessage(param) {
  let paramName;
  if (param.type === "AssignmentPattern" && param.left.type === "Identifier") {
    paramName = param.left.name;
  } else if (param.type === "Identifier") {
    paramName = param.name;
  }

  let funcName;
  if (param.parent.id) {
    funcName = param.parent.id.name;
  } else if (
    ["Property", "MethodDefinition", "TSAbstractMethodDefinition"].includes(
      param.parent.parent?.type
    )
  ) {
    funcName = param.parent.parent.key.name;
  } else if (param.parent.parent?.type === "TSTypeAnnotation") {
    if (
      ["TSPropertySignature", "ClassProperty"].includes(
        param.parent.parent.parent?.type
      )
    ) {
      funcName = param.parent.parent.parent?.key.name;
    } else {
      funcName = param.parent.parent.parent?.name;
    }
  }

  return `Don't use raw boolean value${
    paramName ? ` '${paramName}'` : ""
  } as a parameter${
    funcName ? ` to '${funcName}'` : ""
  }; call sites will appear ambiguous (the "boolean trap")`;
}

function getSuggestions(param, context) {
  const sourceCode = context.getSourceCode();
  const suggestions = [];

  let pattern;
  let typeAnnotation;
  if (param.type === "AssignmentPattern" && param.left.type === "Identifier") {
    pattern = `{ ${param.left.name} = ${sourceCode.getText(param.right)} }`;
    typeAnnotation = `{ ${sourceCode.getText(param.left)}${
      param.left.typeAnnotation == undefined ? ": boolean" : ""
    } }`;
  } else if (param.type === "Identifier") {
    pattern = `{ ${param.name} }`;
    typeAnnotation = `{ ${sourceCode.getText(param)}${
      param.typeAnnotation == undefined ? ": boolean" : ""
    } }`;
  }

  if (pattern && typeAnnotation) {
    suggestions.push({
      desc: `Replace with ${pattern}`,
      fix(fixer) {
        return fixer.replaceText(param, `${pattern}: ${typeAnnotation}`);
      },
    });
  }

  return suggestions;
}

module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    schema: [],
  },

  create(context, _options) {
    const { esTreeNodeToTSNodeMap, program } =
      ESLintUtils.getParserServices(context);
    const checker = program.getTypeChecker();
    return {
      ":function > AssignmentPattern.params, :function > [typeAnnotation].params, TSFunctionType > [typeAnnotation].params, TSEmptyBodyFunctionExpression > [typeAnnotation].params":
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
          if (isBoolean) {
            context.report({
              node: param,
              message: getMessage(param),
              suggest: getSuggestions(param, context),
            });
          }
        },
    };
  },
};

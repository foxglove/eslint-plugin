// #member is slow, see https://github.com/foxglove/studio/pull/430
module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
  },

  create: function (context) {
    return {
      TSPrivateIdentifier: function (node) {
        context.report({
          node,
          message: `Unexpected '${node.escapedText}', prefer private keyword for performance`,
        });
      },
    };
  },
};

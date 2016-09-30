'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'Disallow `.only` calls on `describe` and `it` blocks',
      category: 'Best Practices'
    }
  },
  create: function(context) {
    return {
      MemberExpression(node) {
        const objectName = node.object.name;
        const propertyName = node.property.name;
        if ((objectName === 'describe' || objectName === 'it') && !node.computed && propertyName && propertyName === 'only') {
          context.report(node, 'Do not add .only to {{o}} block', { o: objectName });
        }
      }
    };
  }
};

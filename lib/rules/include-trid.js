'use strict';

const mochaNames = [
  'xit',
  'it',
  'it.skip',
  'it.only'
];


const getCalleeName = callee => {
  if (callee.type === 'MemberExpression') {
    return `${callee.object.name}.${callee.property.name}`;
  }
  return callee.name;
};

let trids = 0;

module.exports = {
  meta: {
    docs: {
      description: 'Force .trid property added to it() calls',
      category: 'Best Practices'
    }
  },
  create: function(context) {
    const hasParentMochaCall = exp => {
      if (exp.parent && exp.parent.type === 'CallExpression') {
        const name = getCalleeName(exp.parent.callee);
        return mochaNames.indexOf(name) > -1;
      }
      return false;
    };

    return {
      FunctionExpression(node) {
        if (hasParentMochaCall(node)) {
          trids = 0;
        }
      },
      'FunctionExpression:exit'(node) {
        if (hasParentMochaCall(node) && trids < 1) {
          context.report(node, 'Function in test block must include Test Rail Id (.trid)');
        }
      },
      AssignmentExpression(node) {
        if (node.left.object && node.left.object.type === 'ThisExpression' && node.left.property && node.left.property.name === 'trid') {
          trids++;
        }
      }
    };
  }
};

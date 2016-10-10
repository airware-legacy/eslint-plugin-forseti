'use strict';

module.exports = {
  rules: {
    'no-only': require('./lib/rules/no-only'),
    'include-trid': require('./lib/rules/include-trid')
  },
  configs: {
    recommended: {
      rules: {
        'forseti/no-only': 2,
        'forseti/include-trid': 2
      }
    }
  }
};

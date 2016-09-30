'use strict';

module.exports = {
  rules: {
    'no-only': require('./lib/rules/no-only')
  },
  configs: {
    recommended: {
      rules: {
        'forseti/no-only': 2
      }
    }
  }
};

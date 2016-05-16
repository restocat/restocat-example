'use strict';

class Companies {

  list() {
    return {
      '/': 'index',
      '/companies': {
        get: 'List of companies',
        post: 'Create new company'
      },
      '/companies/:id': {
        get: 'Get company',
        put: 'Update company'
      }
    };
  }
}

module.exports = Companies;

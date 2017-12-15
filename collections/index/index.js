class IndexCollection {
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
      },
      '/companies/:id/reviews': {
        get: 'Get list of reviews for company'
      },
      '/reviews': {
        get: 'List of reviews',
        post: 'Create new review'
      }
    };
  }
}

module.exports = IndexCollection;

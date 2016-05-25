'use strict';

const reviewsJson = require('./reviews.json');

class Reviews {

  constructor(locator) {
    this._logger = locator.resolve('logger');
  }

  /**
   * GET /
   */
  list() {
    const query = this.$context.request.query;
    const filters = query && query.filters;

    return reviewsJson.filter(review => {
      if (filters && filters.company_id) {
        return review.company === Number(filters.company_id);
      }

      return true;
    });
  }
}

module.exports = Reviews;

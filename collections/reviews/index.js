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

    const reviews = reviewsJson.filter(review => {
      if (query && query.filters && query.filters.company_id) {
        return review.company === Number(query.filters.company_id);
      }

      return true;
    });

    return reviews;
  }
}

module.exports = Reviews;

const Base = require('../BaseCollection');

class CompaniesCollection extends Base {

  /**
   * Handler for "GET /:id/reviews"
   *
   * a forwarding handler
   */
  reviews() {
    const id = this.$context.state.id;

    return this.getService().getReviewsForCompany(id);
  }
}

module.exports = CompaniesCollection;

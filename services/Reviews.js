const Base = require('./Base');
const documents = require('./data/reviews.json');

class CompaniesService extends Base {

  constructor(locator) {
    super(locator);

    this.documents = documents;
  }

  getDocuments(filters) {
    return this.documents.filter(review => {
      if (filters && filters.company_id) {
        return review.company === Number(filters.company_id);
      }

      return true;
    });
  }
}

module.exports = CompaniesService;

const Base = require('./Base');
const documents = require('./data/companies.json');

class CompaniesService extends Base {

  constructor(locator) {
    super(locator);

    this.reviewsService = locator.resolve('reviewsService');
    this.documents = documents;
  }

  getReviewsForCompany(id) {
    return this.reviewsService.getDocuments({company_id: id});
  }
}

module.exports = CompaniesService;

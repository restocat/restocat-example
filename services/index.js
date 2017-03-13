const CompaniesService = require('./Companies');
const ReviewsService = require('./Reviews');

module.exports = {
  register(locator) {
    locator.register('companiesService', CompaniesService, true);
    locator.register('reviewsService', ReviewsService, true);
  }
};

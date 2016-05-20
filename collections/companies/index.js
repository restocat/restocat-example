'use strict';

const companiesJson = require('./companies.json');
const CustomError = require('restocat').CustomError;

class Companies {

  constructor(locator) {
    this._logger = locator.resolve('logger');
  }

  /**
   * Imitation database connection
   *
   * @returns {Promise}
   * @private
   */
  _databaseConnect() {
    return new Promise((fulfill, reject) => setTimeout(() => fulfill(companiesJson), 10));
  }

  /**
   * GET /:id
   */
  one() {
    const id = this.$context.state.id;

    return this._databaseConnect()
      .then(companies => {
        if (!companies[id]) {
          return this.$context.notFound();
        }

        this._logger.info('Some changes');

        return companies[id];
      });
  }

  /**
   * GET /:id/reviews
   */
  reviews() {
    const id = this.$context.state.id;

    return this._databaseConnect()
      .then(companies => {
        if (!companies[id]) {
          return this.$context.notFound();
        }

        this.$context.request.query = {filters: {company_id: id}};

        return this.$context.forward('reviews', 'list');
      });
  }

  /**
   * GET /
   */
  list() {
    return this._databaseConnect()
  }

  /**
   * POST "/"
   */
  create() {
    return this._databaseConnect()
      .then(companies => {
        const index = companies.push(this.$context.request.body);

        this._logger.info('Add new company');

        return companies[index];
      })
  }

  /**
   * PUT "/:id"
   */
  update() {
    return this._databaseConnect()
      .then(companies => {
        const id = this.$context.state.id;

        if (!companies[id]) {
          return this.$context.notFound();
        }

        companies[id] = this.$context.request.body;

        this._logger.info('Update company');

        return companies[id];
      })
  }

  /**
   * DELETE "/:id"
   */
  delete() {
    return this._databaseConnect()
      .then(companies => {
        const id = this.$context.state.id;

        if (!companies[id]) {
          return this.$context.notFound();
        }

        companies[id] = this.$context.request.body;

        this._logger.info('Update company');

        return companies[id];
      })
  }
}

module.exports = Companies;

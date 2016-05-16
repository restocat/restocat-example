'use strict';

const companiesJson = require('./companies.json');
const CustomError = require('restocat').CustomError;

class Companies {

  constructor(locator) {
    this._logger = locator.resolve('logger');
  }

  /**
   * Some changes
   *
   * @returns {Promise}
   * @private
   */
  _databaseConnect() {
    return new Promise((fulfill, reject) => setTimeout(() => fulfill(companiesJson), 100));
  }

  /**
   * GET /:id
   */
  one() {
    const id = this.$context.request.params.id;

    return this._databaseConnect()
      .then(companies => {
        if (!companies[id]) {
          return this.notFound();
        }

        this._logger.info('Some changes');

        return companies[id];
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
        const id = this.$context.params.id;

        if (!companies[id]) {
          return this.notFound();
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
        const id = this.$context.params.id;

        if (!companies[id]) {
          return this.notFound();
        }

        companies[id] = this.$context.request.body;

        this._logger.info('Update company');

        return companies[id];
      })
  }

  notFound() {
    return new CustomError.NotFoundError('Company not found');
  }
}

module.exports = Companies;

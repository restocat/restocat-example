'use strict';

const companiesJson = require('./companies.json');

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
   * Handler for "GET /:id"
   *
   * return one entity
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
   * Handler for "GET /:id/reviews"
   *
   * a forwarding handler
   */
  reviews() {
    const id = this.$context.state.id;

    return this._databaseConnect()
      .then(companies => {
        if (!companies[id]) {
          return this.$context.notFound();
        }

        this.$context.request.query = {filters: {company_id: id}};

        // Forwarding to collection "reviews" and call handle "list"
        return this.$context.forward('reviews', 'list');
      });
  }

  /**
   * Handler for "GET /"
   *
   * return list of entities
   */
  list() {
    return this._databaseConnect()
  }

  /**
   * Handler "POST /"
   *
   * create new entity
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

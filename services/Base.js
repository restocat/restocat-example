class BaseService {

  constructor(locator) {
    this.locator = locator;
    this.logger = locator.resolve('logger');
    this.config = locator.resolve('config');

    this.documents = [];
  }

  /**
   * Imitation database connection
   *
   * @returns {Promise}
   * @private
   */
  _databaseConnect() {
    return new Promise(resolve => setTimeout(() => resolve(this.documents), 10));
  }

  getDocuments() {
    this.logger.info('List of documents');

    return this._databaseConnect();
  }

  getDocumentById(id) {
    this.logger.info('Document by id');

    return this._databaseConnect().then(documents => documents[id]);
  }

  hasDocumentById(id) {
    return this._databaseConnect().then(document => Boolean(document[id]));
  }

  insert(document) {
    return this._databaseConnect()
      .then(documents => {
        const index = documents.push(document) - 1;

        this.logger.info(`Add new document #${index}`);

        return documents[index];
      });
  }

  update(id, document) {
    return this._databaseConnect()
      .then(documents => {
        documents[id] = document;

        this.logger.info(`Update document #${id}`);

        return documents[id];
      });
  }

  remove(id) {
    return this._databaseConnect()
      .then(documents => {
        documents.splice(id, 1);

        this.logger.info(`Remove document #${id}`);
      });
  }
}

module.exports = BaseService;

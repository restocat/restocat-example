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

  async getDocumentById(id) {
    this.logger.info('Document by id');

    const documents = await this._databaseConnect();

    return documents[id];
  }

  async hasDocumentById(id) {
    const documents = await this._databaseConnect();

    return Boolean(documents[id]);
  }

  async insert(document) {
    const documents = await this._databaseConnect();
    const index = documents.push(document) - 1;

    this.logger.info(`Add new document #${index}`);

    return documents[index];
  }

  async update(id, document) {
    const documents = await this._databaseConnect();

    documents[id] = document;

    this.logger.info(`Update document #${id}`);

    return documents[id];
  }

  async remove(id) {
    const documents = await this._databaseConnect();

    documents.splice(id, 1);

    this.logger.info(`Remove document #${id}`);
  }
}

module.exports = BaseService;

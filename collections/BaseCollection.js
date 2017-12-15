class BaseCollection {
  constructor(locator) {
    this.locator = locator;
    this.logger = locator.resolve('logger');
    this.service = null; // current service
  }

  /**
   * Get current service
   *
   * from collection.json#serviceName
   *
   * @return {BaseService} instance of current service
   */
  getService() {
    if (this.service) {
      return this.service;
    }

    if (!this.$context.properties.serviceName) {
      throw new TypeError('collection.json#serviceName is required');
    }

    const serviceName = this.$context.properties.serviceName;

    if (!this.locator.has(serviceName)) {
      throw new TypeError(`Service "${serviceName}" not found in locator`);
    }

    return this.locator.resolve(serviceName);
  }

  canUser(user) {
    const ruleName = `${this.$context.name} ${this.$context.handleName}`; // rule like as 'companies update'

    this.logger.info(`Check access. Rule: "${ruleName}"`);
    // this.acl.can(user.role, ruleName);

    return Promise.resolve(true);
  }

  auth() {
    return Promise.resolve({username: 'user'});
  }

  /**
   * Handler for "GET /:id"
   *
   * return one entity
   */
  async one() {
    const id = this.$context.state.id;

    const has = await this.getService().hasDocumentById(id);

    if (!has) {
      throw this.$context.notFound();
    }

    const document = await this.getService().getDocumentById(id);

    this.$context.response.json(200, JSON.stringify(document));

    return this.$context.notSend(); // manual control of a sending (without formatter)
  }

  /**
   * Handler for "GET /"
   *
   * return list of entities
   */
  list() {
    return this.getService().getDocuments();
  }

  /**
   * Handler "POST /"
   *
   * create new entity
   */
  async create() {
    const user = await this.auth();

    await this.canUser(user); // check access

    return this.getService().insert(this.$context.request.body);
  }

  /**
   * PUT "/:id"
   */
  async update() {
    const id = this.$context.state.id;

    const user = await this.auth();

    await this.canUser(user);

    const has = await this.getService().hasDocumentById(id);

    if (!has) {
      throw this.$context.notFound();
    }

    return this.getService().update(id, this.$context.request.body);
  }

  /**
   * DELETE "/:id"
   */
  async delete() {
    const id = this.$context.state.id;

    const user = await this.auth();

    await this.canUser(user);

    const has = await this.getService().hasDocumentById(id);

    if (!has) {
      throw this.$context.notFound();
    }

    return this.getService().remove(id);
  }
}

module.exports = BaseCollection;

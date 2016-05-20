'use strict';

const bodyParser = require('body-parser');
const Restocat = require('restocat');
const rest = new Restocat();

const Logger = require('restocat-logger');
const logger = Logger.register(rest.locator);

rest.use((request, response) => {
  const def = Promise.defer();

  logger.responseLogger(request, response, (err) => err ? def.reject(err) : def.resolve());

  return def.promise;
});

rest.use((request, response) => {
  const def = Promise.defer();

  bodyParser.json()(request, response, (err) => err ? def.reject(err) : def.resolve());

  return def.promise;
});

rest.use((request, response) => {
  const def = Promise.defer();

  bodyParser.urlencoded({extended: false})(request, response, (err) => err ? def.reject(err) : def.resolve());

  return def.promise;
});

rest.ready()
  .then(() => {
    rest.createServer().listen(3000);
    logger.info('Restocat listen on 3000 port');
  })
  .catch(reason => console.error(reason));
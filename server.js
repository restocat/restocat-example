'use strict';

const bodyParser = require('body-parser');
const Restocat = require('restocat');
const rest = new Restocat();

const Logger = require('restocat-logger');
const logger = Logger.register(rest.locator);

rest.use(logger.responseLogger);

rest.use(bodyParser.json());
rest.use(bodyParser.urlencoded({extended: false}));

rest.ready()
  .then(() => {
    rest.createServer().listen(3000);
    logger.info('Restocat listen on 3000 port');
  })
  .catch(reason => console.error(reason));
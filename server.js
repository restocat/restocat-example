const bodyParser = require('body-parser');
const Restocat = require('restocat');
const rest = new Restocat();
const server = rest.createServer();

// Register logger
const Logger = require('restocat-logger');
const logger = Logger.register(rest.locator);
// Init restocat watcher
const Watcher = require('restocat-watcher');
const watcher = new Watcher(rest.locator);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

// Services
const services = require('./services');
services.register(rest.locator);

server.register('formatter', {
  'text/plain; q=0.3': (context, data) => {
    const string = String(data);

    context.response.setHeader('Content-Length', Buffer.byteLength(string));
    context.response.setHeader('X-FORMATTER', 'CUSTOM');

    return string;
  }
});

server.listen(3009)
  .then(() => {
    logger.info('Restocat listen on 3009 port');

    if (process.env.NODE_ENV !== 'production') {
      watcher.watchCollections();
    }
  })
  .catch(reason => console.error(reason));
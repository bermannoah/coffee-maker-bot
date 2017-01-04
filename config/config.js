var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'coffee-maker-bot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/coffee-maker-bot-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'coffee-maker-bot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/coffee-maker-bot-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'coffee-maker-bot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/coffee-maker-bot-production'
  }
};

module.exports = config[env];

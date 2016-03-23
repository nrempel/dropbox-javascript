'use strict';

Dropbox.DEFAULT_HOST = 'dropboxapi.com';
Dropbox.DEFAULT_PORT = '443';
Dropbox.DEFAULT_BASE_PATH = '/2/';
Dropbox.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Dropbox.PACKAGE_VERSION = require('../package.json').version;
Dropbox.RPC_SUBDOMAIN = 'api';
Dropbox.CONTENT_SUBDOMAIN = 'content';

var endpoints = {
  files: require('./endpoints/Files'),
  sharing: require('./endpoints/Sharing'),
  users: require('./endpoints/Users')
};

function Dropbox (key) {
  if (!(this instanceof Dropbox)) {
    // TODO: Throw error (must instantiate with key)
    return;
  }

  this._config = {
    auth: null,
    host: Dropbox.DEFAULT_HOST,
    port: Dropbox.DEFAULT_PORT,
    basePath: Dropbox.DEFAULT_BASE_PATH,
    timeout: Dropbox.DEFAULT_TIMEOUT,
    rpcSubdomain: Dropbox.RPC_SUBDOMAIN,
    contentSubdomain: Dropbox.CONTENT_SUBDOMAIN,
    version: Dropbox.PACKAGE_VERSION
  };

  // Instantiate all of our endpoints and add instances to 'this'
  for (var endpoint in endpoints) {
    this[endpoint] = new endpoints[endpoint](this._config);
  }

  this.setApiKey(key);
}

Dropbox.prototype.setApiKey = function (key) {
  if (key) {
    this._config.auth = 'Bearer ' + key;
  }
};

module.exports = Dropbox;
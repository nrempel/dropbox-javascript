'use strict';

Dropbox.DEFAULT_HOST = 'api.dropbox.com';
Dropbox.DEFAULT_PORT = '443';
Dropbox.DEFAULT_BASE_PATH = '/2/';
Dropbox.DEFAULT_TIMEOUT = require('http').createServer().timeout;
Dropbox.PACKAGE_VERSION = require('../package.json').version;

Dropbox.resources = {
  // Add resource imports here
};

function Dropbox (key) {
  this.api = {
    auth: null,
    host: Dropbox.DEFAULT_HOST,
    port: Dropbox.DEFAULT_PORT,
    basePath: Dropbox.DEFAULT_BASE_PATH,
    timeout: Dropbox.DEFAULT_TIMEOUT
  };

  this.setApiKey(key);
}

Dropbox.prototype = {

  setApiKey: function (key) {
    if (key) {
      this.api.auth = 'Bearer ' + key;
    }
  }

};

module.exports = Dropbox;

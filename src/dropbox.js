const DEFAULT_HOST = 'dropboxapi.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/2/';
const DEFAULT_TIMEOUT = require('http').createServer().timeout;

const PACKAGE_VERSION = require('../package.json').version;
const RPC_SUBDOMAIN = 'api';
const CONTENT_SUBDOMAIN = 'content';

const ENDPOINTS = {
  files: require('./endpoints/Files'),
  sharing: require('./endpoints/Sharing'),
  users: require('./endpoints/Users'),
};

class Dropbox {

  constructor(key) {
    this._config = {
      auth: null,
      host: DEFAULT_HOST,
      port: DEFAULT_PORT,
      basePath: DEFAULT_BASE_PATH,
      timeout: DEFAULT_TIMEOUT,
      rpcSubdomain: RPC_SUBDOMAIN,
      contentSubdomain: CONTENT_SUBDOMAIN,
      version: PACKAGE_VERSION,
    };

    // Instantiate all of our endpoints
    for (const endpoint in ENDPOINTS) {
      if ({}.hasOwnProperty.call(ENDPOINTS, endpoint)) {
        this[endpoint] = new ENDPOINTS[endpoint](this._config);
      }
    }

    this.setApiKey(key);
  }

  setApiKey(key) {
    if (key) {
      this._config.auth = `Bearer ${key}`;
    }
  }

}

module.exports = Dropbox;

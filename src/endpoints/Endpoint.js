const https = require('https');

const DropboxError = require('../DropboxError');
const DropboxResponse = require('../DropboxResponse');

class Endpoint {
  constructor(config) {
    this._config = config;
  }

  request(payload, callback) {
    const content = JSON.stringify(payload);

    const options = {
      host: `${this._config.rpcSubdomain}.${this._config.host}`,
      path: `${this._config.basePath}${this.path}`,
      port: this._config.port,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content),
        Authorization: this._config.auth,
      },
    };

    const request = https.request(options, (response) => {
      const statusCode = response.statusCode;
      const statusMessage = response.statusMessage;
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        callback(
          null,
          new DropboxResponse(statusCode, statusMessage, JSON.parse(data))
        );
      });
    });

    request.on('error', (error) => {
      callback(new DropboxError(error.code), null);
    });

    request.write(content);
    request.end();
  }
}

module.exports = Endpoint;

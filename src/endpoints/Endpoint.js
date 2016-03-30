const https = require('https');

const DropboxResponse = require('../DropboxResponse');

class Endpoint {
  constructor(config) {
    this._config = config;
  }

  request(payload, path, callback) {
    const content = JSON.stringify(payload);

    const options = {
      host: `${this._config.rpcSubdomain}.${this._config.host}`,
      path: `${this._config.basePath}${path}`,
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
        let parsedData = {};
        if (data) {
          try {
            parsedData = JSON.parse(data);
          } catch (error) {
            callback(new Error(data), null);
            return;
          }
        }
        callback(
          null,
          new DropboxResponse(
            statusCode,
            statusMessage,
            parsedData)
        );
        return;
      });
    });

    request.on('error', (error) => {
      callback(error, null);
      return;
    });

    request.write(content);
    request.end();
  }
}

module.exports = Endpoint;

const https = require('https');

const DropboxResponse = require('../DropboxResponse');

class Endpoint {
  constructor(config) {
    this._config = config;
  }

  request(payload, options, callback) {
    const content = JSON.stringify(payload);

    const requestOptions = {
      host: `${options.subdomain}.${this._config.host}`,
      path: `${this._config.basePath}${options.path}`,
      port: this._config.port,
      method: options.method,
      headers: {
        'Content-Type': this._config.contentType,
        'Content-Length': Buffer.byteLength(content),
        Authorization: this._config.auth,
      },
    };

    const request = https.request(requestOptions, (response) => {
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
    return request;
  }
}

module.exports = Endpoint;

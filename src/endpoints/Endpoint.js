const https = require('https');

class Endpoint {
  constructor(config) {
    this._config = config;
  }

  request(payload) {
    const content = JSON.stringify(payload);
    const request = https.request({
      host: `${this._config.rpcSubdomain}.${this._config.host}`,
      path: `${this._config.basePath}${this.path}`,
      port: this._config.port,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content),
        Authorization: 'Bearer VOCD0Nx_YrkAAAAAAACMeWDJ5dn1hWbutUBaBNJprg-felUOrR18yAuYb21Paq6D',
      },
    }, (response) => {
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });

      response.on('end', () => {
        console.log('No more data in response.');
      });
    });
    console.log(this);
    request.write(content);
    request.end();
  }
}

module.exports = Endpoint;

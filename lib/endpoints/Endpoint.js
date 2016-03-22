'use strict';

var https = require('https');

function Endpoint (config) {
  this._config = config;
}

Endpoint.prototype.request = function (payload) {
  var content = JSON.stringify(payload);
  console.log(content);
  var request = https.request({
    'host': this._config.rpcSubdomain + '.' + this._config.host,
    'path': this._config.basePath + this._path,
    'port': this._config.port,
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content),
      'Authorization': 'Bearer VOCD0Nx_YrkAAAAAAACMeWDJ5dn1hWbutUBaBNJprg-felUOrR18yAuYb21Paq6D'
    }
  }, function (response) {
    response.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });

    response.on('end', function () {
      console.log('No more data in response.');
    });
  });
  console.log(this);
  request.write(content);
  request.end();
};

module.exports = Endpoint;

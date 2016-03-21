'use strict';

var https = require('https');
var util = require('util');
var Endpoint = require('./Endpoint');

function Files () {
  this.copy = function (fromPath, toPath) {
    var request = https.request({
      'host': 'api.dropboxapi.com',
      'path': '/2/files/copy',
      'port': '443',
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer VOCD0Nx_YrkAAAAAAACMeWDJ5dn1hWbutUBaBNJprg-felUOrR18yAuYb21Paq6D'
      }
    }, function (response) {
      response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      response.on('end', () => {
        console.log('No more data in response.');
      });
    });
    request.write('{\"from_path\": \"/Homework/math\",\"to_path\": \"/Homework/algebra\"}');
    request.end();
  };
}

util.inherits(Files, Endpoint);

Files.prototype = {

};

module.exports = Files;

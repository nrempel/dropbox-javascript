'use strict';

var util = require('util');
var Endpoint = require('./Endpoint');

function Files (config) {
  Endpoint.call(this, config);
  this.super = this.constructor.super_.prototype;

  this._path = '/files/copy';

  this.copy = function (fromPath, toPath) {
    this.super.request.call(this, {
      'from_path': fromPath,
      'to_path': toPath
    });
  };
}

util.inherits(Files, Endpoint);

module.exports = Files;

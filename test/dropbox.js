'use strict';

var test = require('tape').test;
var Dropbox = require('../lib/dropbox');

test('Dropbox() should have sane defaults', function (t) {
  var dropbox = new Dropbox('api-key');
  t.same(dropbox.api.auth, 'Bearer api-key');
  t.same(dropbox.api.host, 'api.dropbox.com');
  t.same(dropbox.api.port, '443');
  t.same(dropbox.api.basePath, '/2/');
  t.same(dropbox.api.timeout, 120000);
  t.end();
});
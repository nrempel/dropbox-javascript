'use strict';

var test = require('tape').test;
var Dropbox = require('../lib/dropbox');

test('Dropbox() should have sane defaults', function (t) {
  var dropbox = new Dropbox('api-key');
  t.same(dropbox._config.auth, 'Bearer api-key');
  t.same(dropbox._config.host, 'dropboxapi.com');
  t.same(dropbox._config.port, '443');
  t.same(dropbox._config.basePath, '/2/');
  t.same(dropbox._config.timeout, 120000);
  t.end();
});

test('dropbox.setApiKey() should correctly set the key', function (t) {
  var dropbox = new Dropbox('api-key');
  dropbox.setApiKey('other-key');
  t.same(dropbox._config.auth, 'Bearer other-key');
  t.end();
});

test('dropbox.setApiKey() should be a no-op if no key passed', function (t) {
  var dropbox = new Dropbox('api-key');
  dropbox.setApiKey();
  t.same(dropbox._config.auth, 'Bearer api-key');
  t.end();
});

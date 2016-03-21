'use strict';

var test = require('tape').test;
var Dropbox = require('../lib/dropbox');

test('Dropbox() should have sane defaults', function (t) {
  var dropbox = new Dropbox('api-key');
  t.same(dropbox._api.auth, 'Bearer api-key');
  t.same(dropbox._api.host, 'dropbox.com');
  t.same(dropbox._api.port, '443');
  t.same(dropbox._api.basePath, '/2/');
  t.same(dropbox._api.timeout, 120000);
  t.end();
});

test('dropbox.setApiKey() should correctly set the key', function (t) {
  var dropbox = new Dropbox('api-key');
  dropbox.setApiKey('other-key');
  t.same(dropbox._api.auth, 'Bearer other-key');
  t.end();
});

test('dropbox.setApiKey() should be a no-op if no key passed', function (t) {
  var dropbox = new Dropbox('api-key');
  dropbox.setApiKey();
  t.same(dropbox._api.auth, 'Bearer api-key');
  t.end();
});

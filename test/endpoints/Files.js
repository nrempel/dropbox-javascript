const test = require('../util/test');

const Dropbox = require('../../lib/Dropbox');
const Endpoint = require('../../lib/endpoints/Endpoint');
const Files = require('../../lib/endpoints/Files');


test('Files should inherit from Endpoint', (t) => {
  t.ok(Files.prototype instanceof Endpoint);
  t.end();
});

test('Files should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const files = Files();
    /*eslint-enable*/
  });
  t.end();
});

test('Files.copy() should set request options correctly', (t) => {
  const api = new Dropbox('api-key');
  const request = api.files.copy('/from_path', '/to_path', () => {});
  t.same(request._headers['content-type'], 'application/json');
  t.same(request._headers['content-length'], 47);
  t.same(request._headers.authorization, 'Bearer api-key');
  t.same(request._headers.host, 'api.dropboxapi.com:443');
  t.same(request.path, '/2/files/copy');
  t.end();
});

test('Files.createFolder() should set request options correctly', (t) => {
  const api = new Dropbox('api-key');
  const request = api.files.createFolder('/path', () => {});
  t.same(request.headers['content-type'], 'application/json');
  t.same(request.headers['content-length'], 16);
  t.same(request.headers.authorization, 'Bearer api-key');
  t.same(request.headers.host, 'api.dropboxapi.com:443');
  t.same(request.path, '/2/files/create_folder');
  t.end();
});

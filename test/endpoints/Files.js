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
  t.same(request._headers['content-type'], api._config.contentType);
  t.same(request._headers['content-length'], 47);
  t.same(request._headers.authorization, api._config.auth);
  t.same(request._headers.host,
    `${api._config.rpcSubdomain}.${api._config.host}:${api._config.port}`);
  t.same(request.path, '/2/files/copy');
  t.end();
});

test('Files.createFolder() should set request options correctly', (t) => {
  const api = new Dropbox('api-key');
  const request = api.files.createFolder('/path', () => {});
  t.same(request._headers['content-type'], api._config.contentType);
  t.same(request._headers['content-length'], 16);
  t.same(request._headers.authorization, api._config.auth);
  t.same(request._headers.host,
    `${api._config.rpcSubdomain}.${api._config.host}:${api._config.port}`);
  t.same(request.path, '/2/files/create_folder');
  t.end();
});

test('Files.delete() should set request options correctly', (t) => {
  const api = new Dropbox('api-key');
  const request = api.files.delete('/path', () => {});
  t.same(request._headers['content-type'], api._config.contentType);
  t.same(request._headers['content-length'], 16);
  t.same(request._headers.authorization, api._config.auth);
  t.same(request._headers.host,
    `${api._config.rpcSubdomain}.${api._config.host}:${api._config.port}`);
  t.same(request.path, '/2/files/delete');
  t.end();
});

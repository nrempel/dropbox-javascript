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

test('Files.copy() should respond handle 2** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  api.files.copy('/respond_200', '/respond_200', (error, response) => {
    t.same(error, null);
    t.ok(response);
    t.same(response.statusCode, 200);
    t.ok(response.data);
    t.end();
  });
});

test('Files.copy() should respond handle 4** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  api.files.copy('/respond_400', '/respond_400', (error, response) => {
    t.same(error, null);
    t.ok(response);
    t.same(response.statusCode, 400);
    t.ok(response.data);
    t.end();
  });
});

test('Files.copy() should respond handle 5** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  api.files.copy('/respond_500', '/respond_500', (error, response) => {
    t.same(error, null);
    t.ok(response);
    t.same(response.statusCode, 500);
    t.end();
  });
});

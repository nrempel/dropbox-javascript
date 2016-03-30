const test = require('../util/test');

const Dropbox = require('../../lib/Dropbox');
const Endpoint = require('../../lib/endpoints/Endpoint');


test('Endpoint should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const endpoint = Endpoint();
    /*eslint-enable*/
  });
  t.end();
});

test('Endpoint.request() should catch error and return relevant info', (t) => {
  const nock = test.nock;
  const errorMessage = 'this is an error';

  nock('https://api.dropboxapi.com/2')
   .post('/reply-with-error')
   .replyWithError(errorMessage);

  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  const path = '/reply-with-error';
  endpoint.request({}, path, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(error.message, errorMessage);
    t.same(response, null);
    t.end();
  });
});

test('Endpoint.request() should handle malformed JSON response', (t) => {
  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  const path = '/malformed';
  endpoint.request({}, path, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(response, null);
    t.end();
  });
});

test('Endpoint.request() should respond handle 2** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  const path = '/respond_200';
  endpoint.request({}, path, (error, response) => {
    t.same(error, null);
    t.ok(response);
    t.same(response.statusCode, 200);
    t.ok(response.data);
    t.end();
  });
});

test('Endpoint.request() should respond handle 4** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  const path = '/respond_400';
  endpoint.request({}, path, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(response, null);
    t.end();
  });
});

test('Endpoint.request() should respond handle 5** reponses correctly', (t) => {
  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  const path = '/respond_500';
  endpoint.request({}, path, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(response, null);
    t.end();
  });
});

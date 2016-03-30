const Dropbox = require('../../lib/Dropbox');
const Endpoint = require('../../lib/endpoints/Endpoint');
const test = require('../util/test');

test('Endpoint should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const endpoint = Endpoint();
    /*eslint-enable*/
  });
  t.end();
});

test('Endpoint catch error and return relevant info', (t) => {
  const nock = test.nock;
  const errorMessage = 'this is an error';

  nock('https://api.dropboxapi.com/2')
   .post('/reply-with-error')
   .replyWithError(errorMessage);

  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  endpoint.path = '/reply-with-error';
  endpoint.request({}, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(error.message, errorMessage);
    t.same(response, null);
    t.end();
  });
});

test('Endpoint should handle malformed JSON response', (t) => {
  const api = new Dropbox('api-key');
  const endpoint = new Endpoint(api._config);
  endpoint.path = '/malformed';
  endpoint.request({}, (error, response) => {
    t.ok(error);
    t.ok(error.message);
    t.same(response, null);
    t.end();
  });
});

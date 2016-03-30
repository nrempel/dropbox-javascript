const test = require('./util/test');

const DropboxResponse = require('../lib/DropboxResponse');

test('DropboxResponse should initialize correctly', (t) => {
  const response = new DropboxResponse('statusCode', 'statusMessage', {});
  t.same(response.statusCode, 'statusCode');
  t.same(response.statusMessage, 'statusMessage');
  t.same(response.data, {});
  t.end();
});

test('DropboxResponse should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const dropbox = DropboxResponse();
    /*eslint-enable*/
  });
  t.end();
});

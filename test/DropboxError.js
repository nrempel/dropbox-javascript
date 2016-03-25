const test = require('tape').test;
const DropboxError = require('../lib/DropboxError');

test('DropboxError should inherit from Error', (t) => {
  t.ok(DropboxError.prototype instanceof Error);
  t.end();
});

test('DropboxError should initialize correctly', (t) => {
  const error = new DropboxError('Error message');
  t.same(error.name, 'DropboxError');
  t.same(error.message, 'Error message');
  t.end();
});

test('DropboxError should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const dropbox = DropboxError();
    /*eslint-enable*/
  });
  t.end();
});

test('DropboxError should raise an error when thrown', (t) => {
  const dropboxError = new DropboxError('Error message');
  t.throws(() => {
    throw dropboxError;
  }, Error);
  t.end();
});

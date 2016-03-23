const test = require('tape').test;
const Dropbox = require('../lib/dropbox');

test('Dropbox() should have sane defaults', (t) => {
  const dropbox = new Dropbox('api-key');
  t.same(dropbox._config.auth, 'Bearer api-key');
  t.same(dropbox._config.host, 'dropboxapi.com');
  t.same(dropbox._config.port, '443');
  t.same(dropbox._config.basePath, '/2/');
  t.same(dropbox._config.timeout, 120000);
  t.end();
});

test('Dropbox() should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const dropbox = Dropbox('api-key');
    /*eslint-enable*/
  });
  t.end();
});

test('dropbox.setApiKey() should correctly set the key', (t) => {
  const dropbox = new Dropbox('api-key');
  dropbox.setApiKey('other-key');
  t.same(dropbox._config.auth, 'Bearer other-key');
  t.end();
});

test('dropbox.setApiKey() should be a no-op if no key passed', (t) => {
  const dropbox = new Dropbox('api-key');
  dropbox.setApiKey();
  t.same(dropbox._config.auth, 'Bearer api-key');
  t.end();
});

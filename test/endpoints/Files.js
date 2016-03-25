const test = require('tape').test;
const Files = require('../../lib/endpoints/Files');
const Endpoint = require('../../lib/endpoints/Endpoint');

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

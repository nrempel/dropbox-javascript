const test = require('tape').test;
const Sharing = require('../../lib/endpoints/Sharing');
const Endpoint = require('../../lib/endpoints/Endpoint');

test('Sharing should inherit from Endpoint', (t) => {
  t.ok(Sharing.prototype instanceof Endpoint);
  t.end();
});

test('Sharing should fail if called as function', (t) => {
  t.throws(() => {
    /*eslint-disable*/
    const sharing = Sharing();
    /*eslint-enable*/
  });
  t.end();
});

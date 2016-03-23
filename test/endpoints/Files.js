const test = require('tape').test;
const Files = require('../../lib/endpoints/Files');
const Endpoint = require('../../lib/endpoints/Endpoint');

test('Files should inherit from Endpoint', (t) => {
  t.ok(Files.prototype instanceof Endpoint);
  t.end();
});

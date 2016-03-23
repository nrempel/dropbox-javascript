const test = require('tape').test;
const Users = require('../../lib/endpoints/Users');
const Endpoint = require('../../lib/endpoints/Endpoint');

test('Users should inherit from Endpoint', (t) => {
  t.ok(Users.prototype instanceof Endpoint);
  t.end();
});

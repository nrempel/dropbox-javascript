const path = require('path');
const tape = require('tape');
const tapeNock = require('tape-nock');

module.exports = tapeNock(tape, {
  fixtures: path.join(__dirname, '../fixtures'),
});

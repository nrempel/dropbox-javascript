const Endpoint = require('./Endpoint');

class Files extends Endpoint {
  constructor(config) {
    super(config);
    this.path = '/files/copy';
  }

  copy(fromPath, toPath) {
    this.request({
      from_path: fromPath,
      to_path: toPath,
    });
  }
}

module.exports = Files;

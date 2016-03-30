const Endpoint = require('./Endpoint');

class Files extends Endpoint {
  copy(fromPath, toPath, callback) {
    return this.request(
      {
        from_path: fromPath,
        to_path: toPath,
      },
      '/files/copy',
      callback
    );
  }

  createFolder(path, callback) {
    return this.request(
      { path },
      '/files/create_folder',
      callback
    );
  }
}

module.exports = Files;

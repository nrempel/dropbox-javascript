const Endpoint = require('./Endpoint');

class Files extends Endpoint {
  copy(fromPath, toPath, callback) {
    const options = {
      method: 'POST',
      path: '/files/copy',
      subdomain: this._config.rpcSubdomain,
    };

    return this.request(
      {
        from_path: fromPath,
        to_path: toPath,
      },
      options,
      callback
    );
  }

  createFolder(path, callback) {
    const options = {
      method: 'POST',
      path: '/files/create_folder',
      subdomain: this._config.rpcSubdomain,
    };

    return this.request(
      { path },
      options,
      callback
    );
  }

  delete(path, callback) {
    const options = {
      method: 'POST',
      path: '/files/delete',
      subdomain: this._config.rpcSubdomain,
    };

    return this.request(
      { path },
      options,
      callback
    );
  }
}

module.exports = Files;

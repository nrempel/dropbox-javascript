class DropboxError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DropboxError';
  }
}

module.exports = DropboxError;

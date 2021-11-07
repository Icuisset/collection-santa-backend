/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
class Error500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = Error500;

const crypto = require('crypto');

function generateKey() {
  return crypto.randomBytes(32).toString('hex'); // 256-bit key
}

module.exports = { generateKey };

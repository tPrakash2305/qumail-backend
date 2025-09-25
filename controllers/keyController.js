const crypto = require("crypto");

// In-memory keys (temporary)
const keysDB = {};

const requestKey = (req, res) => {
  const keyId = crypto.randomUUID();
  const keyBytes = crypto.randomBytes(32); // 256-bit key
  const keyMaterial = keyBytes.toString("base64");

  keysDB[keyId] = keyMaterial; // store in memory

  res.json({ keyId, keyMaterial });
};

module.exports = { requestKey, keysDB };

const { keysDB } = require("./keyController");
const { encrypt, decrypt } = require("../utils/cryptoUtils");

const encryptMessage = (req, res) => {
  const { plaintext, keyId, securityLevel } = req.body;
  const key = keysDB[keyId];
  if (!key) return res.status(400).json({ error: "Invalid keyId" });

  const ciphertext = encrypt(plaintext, key, securityLevel);
  res.json({ ciphertext });
};

const decryptMessage = (req, res) => {
  const { ciphertext, keyId, securityLevel } = req.body;
  const key = keysDB[keyId];
  if (!key) return res.status(400).json({ error: "Invalid keyId" });

  const plaintext = decrypt(ciphertext, key, securityLevel);
  res.json({ plaintext });
};

module.exports = { encryptMessage, decryptMessage };

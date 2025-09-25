const crypto = require("crypto");
const keysDB = require("../models/keyDB");

// Request a new key
const requestKey = (req, res) => {
    const keyId = crypto.randomUUID();
    const keyBytes = crypto.randomBytes(32); // 256-bit
    const keyMaterial = keyBytes.toString("base64");

    keysDB[keyId] = keyMaterial;

    res.json({ keyId, keyMaterial });
};

module.exports = { requestKey };

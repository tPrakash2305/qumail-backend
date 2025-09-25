const express = require("express");
const router = express.Router();
const { encryptMessage, decryptMessage } = require("../controllers/cryptoController");

// Encrypt a message
router.post("/encrypt", encryptMessage);

// Decrypt a message
router.post("/decrypt", decryptMessage);

module.exports = router;

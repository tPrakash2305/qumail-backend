const express = require("express");
const router = express.Router();
const { requestKey, validateKey } = require("../controllers/keyController");

// 🔑 Route to get a key for encryption/decryption
router.get("/requestKey", requestKey);

// ✅ Optional: check if a key is valid
router.get("/validateKey", validateKey);

module.exports = router;

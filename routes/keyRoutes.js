const express = require("express");
const router = express.Router();
const { requestKey } = require("../controllers/keyController");

// Request a new key
router.get("/requestKey", requestKey);

module.exports = router;

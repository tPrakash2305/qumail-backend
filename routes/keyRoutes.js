const express = require("express");
const router = express.Router();
const { requestKey } = require("../controllers/keyController");

router.get("/requestKey", requestKey);

module.exports = router;

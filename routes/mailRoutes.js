const express = require("express");
const router = express.Router();
const { sendMail, getInbox } = require("../controllers/mailController");

router.post("/sendMail", sendMail);
router.get("/inbox/:user", getInbox);

module.exports = router;

const express = require('express');
const router = express.Router();
const { addMailMetadata, getAllMails } = require('../controllers/mailController');

router.post('/add', addMailMetadata);
router.get('/all', getAllMails);

module.exports = router;

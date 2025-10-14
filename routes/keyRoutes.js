const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

router.post('/', keyController.createKey);
router.get('/:id', keyController.getKey);

module.exports = router;

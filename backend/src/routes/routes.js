
const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

router.post('/', controller.user);
router.post('/notes', controller.notes);

module.exports = router;
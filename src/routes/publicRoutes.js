const express = require('express');
const monitorController = require('../controllers/monitorController');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/monitor/:apiKey', bodyParser.text({ type: 'text/plain' }), monitorController?.monitor);

module.exports = router;

const express = require('express');
const controller = require('../controllers/postsController');

const router = express.Router();

router.get('/', controller.listAll);

module.exports = router;

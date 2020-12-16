const express = require('express');
const controller = require('../controllers/postsController');

const router = express.Router();

router.get('/', controller.listAll);
router.get('/:id', controller.listOne);
router.post('/', controller.create);

module.exports = router;

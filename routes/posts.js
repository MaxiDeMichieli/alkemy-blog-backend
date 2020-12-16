const express = require('express');
const controller = require('../controllers/postsController');
const postsValidator = require('../validations/postsValidator');

const router = express.Router();

router.get('/', controller.listAll);
router.get('/:id', controller.listOne);
router.post('/', postsValidator, controller.create);
router.patch('/:id', postsValidator, controller.edit);

module.exports = router;

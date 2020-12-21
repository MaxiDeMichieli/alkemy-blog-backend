const express = require('express');
const postsValidator = require('../validations/postsValidator');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const {
  listAll, listOne, create, edit, remove, listCategories,
} = require('../controllers/postsController');

const router = express.Router();

router.get('/', asyncMiddleware(listAll));
router.get('/categories', asyncMiddleware(listCategories));
router.get('/:id', asyncMiddleware(listOne));
router.post('/', postsValidator, asyncMiddleware(create));
router.patch('/:id', postsValidator, asyncMiddleware(edit));
router.delete('/:id', asyncMiddleware(remove));

module.exports = router;

const { check } = require('express-validator');

const postValidator = [
  check('title')
    .isLength({ min: 1 })
    .withMessage('The title id required'),

  check('title')
    .isLength({ max: 100 })
    .withMessage('The title must be less than 100 characters'),

  check('content')
    .isLength({ min: 1 })
    .withMessage('The content is required'),

  check('content')
    .isLength({ max: 1000 })
    .withMessage('The content must be less than 1000 characters'),

  check('image')
    .isLength({ max: 1000 })
    .withMessage('The image url must be less than 1000 characters'),

  check('category')
    .isLength({ min: 1 })
    .withMessage('The category is required'),
];

module.exports = postValidator;

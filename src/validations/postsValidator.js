const { check } = require('express-validator');

const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg)/;
const regexTest = (value) => imageRegex.test(value);

const postValidator = [
  check('title')
    .isLength({ min: 1 })
    .withMessage('The title id required'),

  check('title')
    .isLength({ max: 100 })
    .withMessage('The title must be less than 100 characters'),

  check('body')
    .isLength({ min: 1 })
    .withMessage('The body is required'),

  check('body')
    .isLength({ max: 1000 })
    .withMessage('The body must be less than 1000 characters'),

  check('image')
    .isLength({ max: 500 })
    .withMessage('The image url must be less than 500 characters'),

  check('image')
    .custom(regexTest)
    .withMessage('The image must be in png, jpg or jpeg format'),

  check('category')
    .isLength({ min: 1 })
    .withMessage('The category is required'),
];

module.exports = postValidator;

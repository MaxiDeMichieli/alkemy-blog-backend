const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { responseWithoutError, validationErrorHandler } = require('../utils/responsesBuilder');
const {
  refactorPost, postsFindAll, postsFindOne, postsCreate, postsUpdate, postsRemove, postsCategories,
} = require('../utils/postServices');

const controller = {
  listAll: async (req, res) => {
    const data = await postsFindAll();
    const posts = data.map(refactorPost);
    responseWithoutError(res, 'Ok', posts);
  },
  listOne: async (req, res) => {
    const { id } = req.params;
    const data = await postsFindOne({ id });
    if (data === null) {
      throw boom.badRequest('Post not found');
    } else {
      const post = refactorPost(data);
      responseWithoutError(res, 'Ok', post);
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw validationErrorHandler(errors);
    }
    const data = await postsCreate(req.body);
    responseWithoutError(res, 'Post created', data.dataValues);
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw validationErrorHandler(errors);
    }
    const data = await postsUpdate(req.body, { id });
    if (data[0] === 0) {
      const error = 'There is not any post with this id';
      throw boom.badRequest(error);
    }
    responseWithoutError(res, 'Post edited');
  },
  remove: async (req, res) => {
    const { id } = req.params;
    const data = await postsRemove({ id });
    if (!data) {
      const error = 'There is not any post with this id';
      throw boom.badRequest(error);
    }
    responseWithoutError(res, 'Post removed');
  },
  listCategories: async (req, res) => {
    const categories = await postsCategories();
    responseWithoutError(res, 'Ok', categories);
  },
};

module.exports = controller;

const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const { responseWithoutError, validationErrorHandler } = require('../utils/responses');
const {
  refactorPost, postsFindAll, postsFindOne, postsCreate, postsUpdate, postsRemove,
} = require('../utils/postsManager');

const controller = {
  listAll: async (req, res, next) => {
    try {
      const data = await postsFindAll();
      const posts = data.map((post) => {
        const refactoredPost = refactorPost(post);
        return refactoredPost;
      });
      responseWithoutError(res, 'Ok', posts);
    } catch (err) {
      next(err);
    }
  },
  listOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await postsFindOne({ id });
      if (data === null) {
        throw boom.badRequest('Post not found');
      } else {
        const post = refactorPost(data);
        responseWithoutError(res, 'Ok', post);
      }
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw validationErrorHandler(errors);
      }
      const data = await postsCreate(req.body);
      responseWithoutError(res, 'Post created', data.dataValues);
    } catch (err) {
      next(err);
    }
  },
  edit: async (req, res, next) => {
    try {
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
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await postsRemove({ id });
      if (data === 0) {
        const error = 'There is not any post with this id';
        throw boom.badRequest(error);
      }
      responseWithoutError(res, 'Post removed');
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controller;

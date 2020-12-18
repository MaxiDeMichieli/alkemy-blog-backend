const { validationResult } = require('express-validator');
const boom = require('@hapi/boom');
const db = require('../database/models');
const { responseWithoutError, validationErrorHandler } = require('../utils/responses');

const controller = {
  listAll: async (req, res, next) => {
    try {
      const data = await db.Posts.findAll({
        include: [
          { association: 'category' },
        ],
      });
      const posts = data.map((post) => {
        const refactoredPost = {
          id: post.id,
          title: post.title,
          image: post.image,
          category: post.category.category,
          creationDate: post.createdAt,
        };
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
      const data = await db.Posts.findOne({
        where: {
          id,
        },
        include: [
          { association: 'category' },
        ],
      });
      if (data === null) {
        throw boom.badRequest('Post not found');
      } else {
        const post = {
          id: data.id,
          title: data.title,
          image: data.image,
          category: data.category.category,
          creationDate: data.createdAt,
        };
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
      const {
        title, content, image, category,
      } = req.body;
      const data = await db.Posts.create({
        title: title.trim(),
        content: content.trim(),
        image,
        category_id: category,
      });
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
      const {
        title, content, image, category,
      } = req.body;
      const data = await db.Posts.update({
        title: title.trim(),
        content: content.trim(),
        image,
        category_id: category,
      }, {
        where: {
          id,
        },
      });
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
      const data = await db.Posts.destroy({
        where: {
          id,
        },
      });
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

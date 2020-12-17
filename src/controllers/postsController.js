const { validationResult } = require('express-validator');
const db = require('../database/models');
const { responseWithError, responseWithoutError } = require('../utils/responses');

const controller = {
  listAll: async (req, res) => {
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
      responseWithoutError(res, 'Ok', 200, posts);
    } catch (err) {
      responseWithError(res, 'Server error', 500, err);
    }
  },
  listOne: async (req, res) => {
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
        responseWithError(res, 'Post not found', 400, true);
      } else {
        const post = {
          id: data.id,
          title: data.title,
          image: data.image,
          category: data.category.category,
          creationDate: data.createdAt,
        };
        responseWithoutError(res, 'Ok', 200, post);
      }
    } catch (err) {
      responseWithError(res, 'Server error', 500, err);
    }
  },
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.mapped();
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
      responseWithoutError(res, 'Post created', 200, data.dataValues);
    } catch (err) {
      responseWithError(res, 'Server error', 500, err);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.mapped();
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
        throw error;
      }
      responseWithoutError(res, 'Post edited', 200);
    } catch (err) {
      responseWithError(res, 'Server error', 500, err);
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await db.Posts.destroy({
        where: {
          id,
        },
      });
      if (data === 0) {
        const error = 'There is not any post with this id';
        throw error;
      }
      responseWithoutError(res, 'Post removed', 200);
    } catch (err) {
      responseWithError(res, 'Server error', 500, err);
    }
  },
};

module.exports = controller;

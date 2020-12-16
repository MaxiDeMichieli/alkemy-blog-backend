const { validationResult } = require('express-validator');
const db = require('../database/models');
const { withError, withoutError } = require('../utils/responses');

const controller = {
  listAll: async (req, res) => {
    try {
      const data = await db.Posts.findAll({
        include: [
          { association: 'category' },
        ],
      });
      const posts = data.map((e) => {
        const post = {
          id: e.id,
          title: e.title,
          image: e.image,
          category: e.category.category,
          creationDate: e.createdAt,
        };
        return post;
      });
      withoutError(res, 'Ok', 200, posts);
    } catch (err) {
      withError(res, 'Server error', 500, err);
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
        withError(res, 'Post not found', 400, true);
      } else {
        const post = {
          id: data.id,
          title: data.title,
          image: data.image,
          category: data.category.category,
          creationDate: data.createdAt,
        };
        withoutError(res, 'Ok', 200, post);
      }
    } catch (err) {
      withError(res, 'Server error', 500, err);
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
      withoutError(res, 'Post created', 200, data.dataValues);
    } catch (err) {
      withError(res, 'Server error', 500, err);
    }
  },
};

module.exports = controller;

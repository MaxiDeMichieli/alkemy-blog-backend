const db = require('../database/models');

const controller = {
  listAll: async (req, res) => {
    const data = await db.Posts.findAll();
    res.json(data);
  },
};

module.exports = controller;

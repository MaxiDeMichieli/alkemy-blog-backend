const Sequelize = require('sequelize');
const Posts = require('./Posts');
const Categories = require('./Categories');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelPosts = Posts(sequelize, Sequelize.DataTypes);
db[modelPosts.name] = modelPosts;

const modelCategories = Categories(sequelize, Sequelize.DataTypes);
db[modelCategories.name] = modelCategories;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;

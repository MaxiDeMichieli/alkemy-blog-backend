const db = require('../database/models');

const include = [{ association: 'category' }];

const postServices = {
  refactorPost: (post) => {
    const refactoredPost = {
      id: post.id,
      title: post.title,
      image: post.image,
      category: post.category.category,
      creationDate: post.createdAt,
    };
    return refactoredPost;
  },
  postToSave: (body) => {
    const data = {
      title: body.title,
      content: body.content,
      image: body.image,
      category_id: body.category,
    };
    return data;
  },
  postsFindAll: (where) => db.Posts.findAll({ where, include }),
  postsFindOne: (where) => db.Posts.findOne({ where, include }),
  postsCreate: (body) => db.Posts.create(postServices.postToSave(body)),
  postsUpdate: (body, where) => db.Posts.update(postServices.postToSave(body), { where }),
  postsRemove: (where) => db.Posts.destroy({ where }),
};

module.exports = postServices;

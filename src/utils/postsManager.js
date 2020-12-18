const db = require('../database/models');

const postsManager = {
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
  postsFindAll: (where) => {
    const include = [{ association: 'category' }];
    return db.Posts.findAll({ where, include });
  },
  postsFindOne: (where) => {
    const include = [{ association: 'category' }];
    return db.Posts.findOne({ where, include });
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
  postsCreate: (body) => db.Posts.create(postsManager.postToSave(body)),
  postsUpdate: (body, where) => db.Posts.update(postsManager.postToSave(body), { where }),
  postsRemove: (where) => db.Posts.destroy({ where }),
};

module.exports = postsManager;

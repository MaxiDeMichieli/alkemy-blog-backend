const Posts = (sequelize, dataTypes) => {
  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    body: {
      type: dataTypes.STRING(1000),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(500),
    },
    category_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };

  const config = {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
  };

  const Post = sequelize.define('Posts', cols, config);

  Post.associate = (models) => {
    Post.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'category_id',
    });
  };

  return Post;
};

module.exports = Posts;

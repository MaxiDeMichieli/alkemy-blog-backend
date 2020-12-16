module.exports = (sequelize, dataTypes) => {
  const alias = 'Categories';

  const cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
  };

  const config = {
    tableName: 'categories',
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.hasMany(models.Posts, {
      as: 'posts',
      foreignKey: 'category_id',
    });
  };

  return Category;
};

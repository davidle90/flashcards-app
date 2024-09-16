module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  });

  Category.associate = (models) => {
    Category.hasMany(models.Flashcard, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
  };

  return Category;
};

module.exports = (sequelize, DataTypes) => {
  const Flashcard = sequelize.define('Flashcard', {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      allowNull: false
    }
  });

  Flashcard.associate = (models) => {
    Flashcard.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return Flashcard;
};

module.exports = (Sequelize, sequelize) => {
  return sequelize.define('turtles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    weaponId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    firstFavoritePizzaId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    secondFavoritePizzaId: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });
};
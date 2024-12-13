const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect,
  });

  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  weapons.hasOne(turtles, { foreignKey: 'weaponId' });
  pizzas.hasMany(turtles, { foreignKey: 'firstFavoritePizzaId', foreignKey: 'secondFavoritePizzaId' });

  turtles.belongsTo(pizzas, { foreignKey: 'secondFavoritePizzaId', foreignKey: 'firstFavoritePizzaId' })

  return {
    turtles,
    weapons,
    pizzas,

    sequelize: sequelize,
    Sequelize: Sequelize,
  };
};
const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
  const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect,
  });
  console.log(2);
  console.log(config.dbName)

  const turtles = Turtle(Sequelize, sequelize);
  const weapons = Weapon(Sequelize, sequelize);
  const pizzas = Pizza(Sequelize, sequelize);

  turtles.hasOne(weapons, { foreignKey: 'nID' });
  turtles.hasOne(weapons, { foreignKey: 'nID' });
  turtles.hasMany(pizzas, { foreignKey: 'nID' });

  return {
    turtles,
    weapons,
    pizzas,

    sequelize: sequelize,
    Sequelize: Sequelize,
  };
};
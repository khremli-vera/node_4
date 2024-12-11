module.exports = (Sequelize, sequelize) => {
    return sequelize.define('news', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE
        }
    })
}
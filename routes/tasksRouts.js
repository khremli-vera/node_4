const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const tasksRouter = express.Router();

tasksRouter.get('/tasks/1', async (req, res) => {
    try {
        const data = await db.turtles.findAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})

tasksRouter.get('/tasks/2', async (req, res) => {
    try {
        db.turtles.belongsTo(db.pizzas, { foreignKey: 'firstFavoritePizzaId' })
        const data1 = await db.turtles.findAll({
            include: [{
                model: db.pizzas,
                where: { name: 'Mozarella' }
            }]
        })
        console.log(data1)
        db.turtles.belongsTo(db.pizzas, { foreignKey: 'secondFavoritePizzaId' })
        const data2 = await db.turtles.findAll({
            include: [{
                model: db.pizzas,
                where: { name: 'Mozarella' }
            }]
        })

        const data = [...data1, ...data2]
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})


tasksRouter.get('/tasks/3', async (req, res) => {
    try {
        db.turtles.belongsTo(db.pizzas, { foreignKey: 'firstFavoritePizzaId' });
        const data1 = await db.turtles.findAll({
            attributes: ['firstFavoritePizzaId'],
            group: 'firstFavoritePizzaId'
        })
        const data1_values = data1.map(item => item.firstFavoritePizzaId)

        db.turtles.belongsTo(db.pizzas, { foreignKey: 'secondFavoritePizzaId' });
        const data2 = await db.turtles.findAll({
            attributes: ['secondFavoritePizzaId'],
            group: 'secondFavoritePizzaId'
        })
        const data2_values = data2.map(item => item.secondFavoritePizzaId)

        const uniqueId = new Set([...data1_values, ...data2_values])
        res.status(200).send(Array.from(uniqueId))
    } catch (err) {
        res.status(500).send(err);
    }
})


tasksRouter.get('/tasks/5', async (req, res) => {
    try {
        await db.pizzas.update(
            { description: Sequelize.literal(`CONCAT('SUPER FAT! ', description)`) },
            {
                where: {
                    calories:
                        { [Op.gt]: 3000 },
                },
            },
        );
        res.status(200).send('Updated')
    } catch (err) {
        res.status(500).send(err);
    }
})



tasksRouter.get('/tasks/6', async (req, res) => {
    try {
        const data = await db.weapons.findAndCountAll({ 
            where: {
                dps:
                    { [Op.gt]: 100 }
            }
        })
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})


tasksRouter.get('/tasks/8', async (req, res) => {
    try {

        await db.turtles.update(
            {
                firstFavoritePizzaId: 2,
            },
            {
                where: { id: 6 },
            }
        );
        res.status(200).send('updated')
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = tasksRouter;
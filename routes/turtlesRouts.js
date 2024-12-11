const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const fieldTypes = {
    "name": 'string',
    "color": 'string',
    "weaponId": 'number',
    "firstFavoritePizzaId": 'number',
    "secondFavoritePizzaId": 'number'
}

const turtlesRouter = express.Router();

turtlesRouter.post('/turtles', async (req, res) => {
    const { body } = req;
    console.log(areAllFields(body));
    console.log(areTypesRight(body));


    try {
        if (areAllFields(body) && areTypesRight(body)) {
            console.log(2)
            const newTurtle = await db.turtles.create(body)

            res.status(201).send(newTurtle)
        } else {
            res.status(400).send('Invalid data')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

turtlesRouter.put('/turtles/:id', async (req, res) => {
    const { body } = req;
    const { params } = req;
    //проверить есть ли такой id 
    try {
        if (areTypesRight(body)) {
            const updItem = await db.turtles.update(body, {
                where: {
                    id: params.id
                }
            })
            const item = await db.turtles.findAll({
                where: {
                    id: params.id
                }
            })

            res.status(200).send(item)
        } else {
            res.status(400).send('Invalid data')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

turtlesRouter.delete('/turtles/:id', async (req, res) => {
    const { params } = req;

    //проверить есть ли такой id 
    try {
        const updItem = await db.turtles.destroy({where: {id: params.id}})
        res.status(200).send("removed")
    } catch (err) {
        res.status(500).send(err);
    }
})

turtlesRouter.get('/turtles', async (req, res) => { 
    try {
        const data = await db.turtles.findAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})

turtlesRouter.get('/turtles/:id', async (req, res) => { 
    //проверить есть ли такой id 
    try {
        const { params } = req;
        const data = await db.turtles.findAll({where: {id: params.id}})
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})



function areAllFields(body) {
    if (body.name && body.color && body.weaponId && body.firstFavoritePizzaId && body.secondFavoritePizzaId) {
        return true
    } else {
        return false
    }
}

function areTypesRight(body) {
    for (key in body) {
        if (typeof body[key] !== fieldTypes[key]) {
            return false
        }
    }
    return true
}

module.exports = turtlesRouter;
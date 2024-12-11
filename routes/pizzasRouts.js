const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const fieldTypes = {
    "name": 'string',
    "description": 'string',
    "calories": 'number'
}

const pizzasRouter = express.Router();

pizzasRouter.post('/pizzas', async (req, res) => {
    const { body } = req;
    console.log(areAllFields(body));
    console.log(areTypesRight(body));


    try {
        if (areAllFields(body) && areTypesRight(body)) {
            console.log(2)
            const newpizza = await db.pizzas.create(body)

            res.status(201).send(newpizza)
        } else {
            res.status(400).send('Invalid data')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

pizzasRouter.put('/pizzas/:id', async (req, res) => {
    const { body } = req;
    const { params } = req;
    //проверить есть ли такой id 
    try {
        if (areTypesRight(body)) {
            const updItem = await db.pizzas.update(body, {
                where: {
                    id: params.id
                }
            })
            const item = await db.pizzas.findAll({
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

pizzasRouter.delete('/pizzas/:id', async (req, res) => {
    const { params } = req;

    //проверить есть ли такой id 
    try {
        const updItem = await db.pizzas.destroy({where: {id: params.id}})
        res.status(200).send("removed")
    } catch (err) {
        res.status(500).send(err);
    }
})

pizzasRouter.get('/pizzas', async (req, res) => { 
    try {
        const data = await db.pizzas.findAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})

pizzasRouter.get('/pizzas/:id', async (req, res) => { 
    //проверить есть ли такой id 
    try {
        const { params } = req;
        const data = await db.pizzas.findAll({where: {id: params.id}})
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})



function areAllFields(body) {
    if (body.name && body.description && body.calories) {
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

module.exports = pizzasRouter;
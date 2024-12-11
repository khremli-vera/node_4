const Sequelize = require('sequelize');
const express = require('express');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
const fieldTypes = {
    "name": 'string',
    "dps": 'number',
}

const weaponsRouter = express.Router();

weaponsRouter.post('/weapons', async (req, res) => {
    const { body } = req;

    try {
        if (areAllFields(body) && areTypesRight(body)) {
            const newWeapon = await db.weapons.create(body)

            res.status(201).send(newWeapon)
        } else {
            res.status(400).send('Invalid data')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

weaponsRouter.put('/weapons/:id', async (req, res) => {
    const { body } = req;
    const { params } = req;
    //проверить есть ли такой id 
    try {
        if (areTypesRight(body)) {
            const updItem = await db.weapons.update(body, {
                where: {
                    id: params.id
                }
            })
            const item = await db.weapons.findAll({
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

weaponsRouter.delete('/weapons/:id', async (req, res) => {
    const { params } = req;

    //проверить есть ли такой id 
    try {
        const updItem = await db.weapons.destroy({where: {id: params.id}})
        res.status(200).send("removed")
    } catch (err) {
        res.status(500).send(err);
    }
})

weaponsRouter.get('/weapons', async (req, res) => { 
    try {
        const data = await db.weapons.findAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})

weaponsRouter.get('/weapons/:id', async (req, res) => { 
    //проверить есть ли такой id 
    try {
        const { params } = req;
        const data = await db.weapons.findAll({where: {id: params.id}})
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err);
    }
})



function areAllFields(body) {
    if (body.name && body.dps) {
        return true
    } else {
        return false
    }
}

function areTypesRight(body) {
    // валидация целого числа
    for (key in body) {
        if (typeof body[key] !== fieldTypes[key]) {
            return false
        }
    }
    return true
}

module.exports = weaponsRouter;
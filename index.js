const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const express = require('express');

const app = express();
app.use(express.json());

const weaponsRouter = require('./routes/weaponsRouts');
const pizzasRouter = require('./routes/pizzasRouts');
const turtlesRouter = require('./routes/turtlesRouts');
const tasksRouter = require('./routes/tasksRouts');

app.use('/', weaponsRouter);
app.use('/:id', weaponsRouter);
app.use('/', pizzasRouter);
app.use('/:id', pizzasRouter);
app.use('/', turtlesRouter);
app.use('/:id', turtlesRouter);
app.use('/', tasksRouter);
app.use('/:id', tasksRouter);
app.use('/*', function (req, res) {
    res.status(400).send("Invalid request")
})

db.sequelize.sync({alert: true})
.then(() => {
    console.log('connected to db');
    app.listen(3000, () => console.log('server started'));
})
.catch((err) => console.log('err', err))
const Sequelize = require('sequelize');

const config = require('./config.json');

const db = require('./models')(Sequelize, config);

// TODO: запросы к БД




// const express = require('express');

// const app = express();
// const sequelize = new Sequelize('node4', 'postgres', '9860777vera', {
//     host: 'localhost',
//     dialect: 'postgres',
// });
// const news = require('./models/news')(Sequelize, sequelize);

// app.use(express.json());

// app.post('/api/news', async ({body}, res) => {
//     try {
//         const newItem = await news.create(body);

//         res.json(newItem);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })



// sequelize.sync({force: true})
// .then(() => {
//     console.log('connected to db');
//     app.listen(3000, () => console.log('server started'));
// })
// .catch((err) => console.log('err', err))
const express = require('express');
const mysql = require('mysql2');
// const { Sequelize} = require('sequelize');
// const sequelize = new Sequelize('groupomania','root','MySQL123!', {
//     host: 'localhost',
//     dialect: 'mysql'
// })
// sequelize.authenticate()
// .then(() => console.log("Connextion réussie"))
// .catch(error => console.log(error))

// const dotenv = require('dotenv').config();
// const DATABASE_HOST = process.env.DATABASE_HOST;
// const DATABASE_USER = process.env.DATABASE_USER;
// const DATABASE_PW = process.env.DATABASE_PW;
// const DATABASE_NAME = process.env.DATABASE_NAME;
// const con = mysql.createConnection({
//   host: DATABASE_HOST,
//   user: DATABASE_USER,
//   password: DATABASE_PW,
//   database: DATABASE_NAME
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


const app = express();


app.use(express.json()); //on recupère le corps JSON des requête POST

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


module.exports = app;
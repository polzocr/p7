const express = require('express');
const mysql = require('mysql2');
const path = require("path");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();


app.use(express.json()); //on recupère le corps JSON des requête POST

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/', userRoutes);
app.use('/', postRoutes);


app.use(function(err, req, res, next) {
    if(err.code === "FILE_TYPE"){
        res.status(401).json({error: "wrong file type"});
        return;
    }
})

module.exports = app;
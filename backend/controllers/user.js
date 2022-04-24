const db = require('../models/index');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = ( req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create({firstName: req.body.firstName, lastName: req.body.lastName, email:req.body.email, password: hash})
        .then(() => res.status(200).json({message: "Utilisateur crée avec succès !"}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));   
};

exports.login = (req, res, next) => {
    
};


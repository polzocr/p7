const db = require('../models/index');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

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
   db.User.findOne({where: {email:req.body.email}})
   .then(user => {
       if(!user){
           return res.status(401).json({error: "Utilisateur non trouvé"});
       }
       bcrypt.compare(req.body.password, user.password)
       .then(valid => {
           if(!valid) {
               return res.status(401).json({error: "Mot de passe incorrect !"});
           }
           res.status(200).json({
               userId: user.id,
               token: jwt.sign(
                   {userId: user.id},
                   TOKEN,
                   {expiresIn: '24h'}
               )
           });
       })
       .catch();
   })
   .catch(error => res.status(500).json({error})); 
};


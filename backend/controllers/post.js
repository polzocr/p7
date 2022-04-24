const db = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    db.Post.create({
        UserId: req.body.userId, 
        name:req.body.name, 
        text:req.body.text, 
        //image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    .then(() => res.status(201).json({message: 'Post crée avec succès !'}))
    .catch(error => {
        console.log(error)
        res.status(400);
    });
};

exports.getAllPosts = (req, res, next) => {

};

exports.getOnePost = (req, res, next) => {

};

exports.modifyPost = (req, res, next) => {

};

exports.deletePost = (req, res, next) => {

};

exports.likePost = (req, res, next) => {

};
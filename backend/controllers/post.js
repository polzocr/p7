const db = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    let img;
    if(req.file){
        img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } else {
        img = null;
    }
    db.Post.create({
        UserId: req.auth.userId, 
        name:req.body.name, 
        text:req.body.text,
        image_url: img,
        likes: 0,
        dislikes: 0
    })
    .then(() => res.status(201).json({message: 'Post crée avec succès !'}))
    .catch(error => {
        console.log(error)
        res.status(400);
    });
};

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
};

exports.getOnePost = (req, res, next) => {
    db.Post.findOne({where: {id: req.params.id} })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({error}));
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file?{
        ...req.body,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...req.body}
    db.Post.findOne({where: {id:req.params.id} })
    .then(post => {
        if(post.userId !== req.auth.userId){
            res.status(401).json({error: "Requête non autorisée"})
        }
        db.Post.update({ ...postObject}, {where: {id: req.params.id} })
        .then(() => res.status(200).json({message:'Objet modifié avec succès !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(404).json({error: "Post non trouvé"}));
};

exports.deletePost = (req, res, next) => {
    let filename = null;
    db.Post.findOne({where: {id: req.params.id} })
    .then(post => {
        if(post.image_url !== null){
            filename = post.image_url.split('/images/')[1];
        };
        fs.unlink(`images/${filename}`, () => {
            db.Post.findOne({where: {id:req.params.id} })
            .then(post => {
                if(!post) {
                    return res.status(404).json({error: new Error('Objet non trouvé !')});
                }
                if(post.userId !== req.auth.userId){
                    return res.status(401).json({error: new Error('Requête non autorisée !')});
                }
                db.Post.destroy({where: {id:req.params.id} })
                .then(() => res.status(200).json({message: 'Objet supprimé avec succès !'}))
                .catch(error => res.status(400).json({error:"Erreur ici"}));
            })
            .catch(error => res.status(500).json({error: "Erreur la"}));
        })   
    })
    .catch(error => res.status(500).json({error: "Erreur ici ou la"}));
};

exports.likePost = (req, res, next) => {

};


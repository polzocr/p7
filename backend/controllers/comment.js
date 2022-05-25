const db = require('../models');

exports.createComment = (req,res,next) => {
   db.Comment.create({
    UserId: req.auth.userId,
    PostId: req.body.PostId,
    text: req.body.text
   })
   .then(() => res.status(201).json({message:'Commentaire créé avec succès'}))
   .catch(error => res.status(400).json({error:'Commentaire créé avec insuccès!'})); 
};

exports.getAllComments = (req,res,next) => {
    db.Comment.findAll({where: {postId: req.params.id}, include:[{model:db.User, attributes:['firstName', 'lastName']}] })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({error: "Commentaires non trouvés"}))
};

exports.deleteComment = (req,res,next) => {
    db.Comment.findOne({where: {id:req.params.id} })
    .then(comment => {
        if(!comment){
            return res.status(404).json({error:'Commentaire non trouvé !'})
        }
        if(comment.userId !== req.auth.userId){
            return res.status(401).json({error: 'Requête non autorisée !'})
        }
        db.Comment.destroy({where: {id:req.params.id} })
        .then(() => res.status(200).json({message: 'Commentaire supprimé avec succès !'}))
        .catch(error => res.status(400).json({error: "la"}));
    })
    .catch(error => res.status(400).json({error:"ici"}));
};
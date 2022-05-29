const db = require('../models');

exports.likeOrDislikePost = (req,res,next) => {
    const like = req.body.like
    switch(like){
        case 0:
            db.Like.findOne({where: {postId:req.params.id, userId: req.auth.userId} })
            .then(like => {
                if(!like){
                    return res.status(404).json({error:'like non trouvé'})
                }
                db.Like.destroy({where: {id:like.id} })
               .then(() => res.status(200).json({message:'Like ou dislike retiré avec succès !'}))
               .catch(error => res.status(401).json({error: 'Erreur voyons !'}));
            })
            .catch(error => res.status(404).json({error:'like non trouvé'}));
            break;
        case 1:
            db.Like.findOne({where: {postId:req.params.id, userId: req.auth.userId} })
            .then(like => {
                if(!like){
                    db.Like.create({
                    UserId: req.auth.userId,
                    PostId: req.params.id,
                    stateLike: true
                    })
                    .then(() => res.status(201).json({message:'liké avec succès !'}))
                    .catch(error => res.status(401).json({error: 'Le like est pas passé'}))
                } else {
                    return res.status(401).json({error:'Impossibeul à liquer'})
                }
            })
            .catch(error => res.status(404).json({error:"casse de brice"}));
            break;
        case -1: 
            db.Like.findOne({where: {postId:req.params.id, userId: req.auth.userId} })
            .then(like => {
                if(!like){
                    db.Like.create({
                    UserId: req.auth.userId,
                    PostId: req.params.id,
                    stateLike: false
                    })
                    .then(() => res.status(201).json({message:'disliké avec succès !'}))
                    .catch(error => res.status(401).json({error: 'Le dislike est pas passé'}))
                } else {
                    return res.status(401).json({error:'Impossibeul à disliquer'})
                }
            })
            .catch(error => res.status(404).json({error:"casse"}));
            break;
        default:
            res.status(400).json({error:"petit filou"});
    }
};



// exports.likeOrDislikePost = (req,res,next) => {
//     db.Like.findOne({where: {postId:req.params.id, userId: req.auth.userId} })
//     .then(like => {
//         if(!like){
//             db.Like.create({
//                 UserId: req.auth.userId,
//                 PostId: req.params.id,
//                 stateLike: req.body.stateLike
//             })
//             .then(() => res.status(201).json({message:'Post liké ou disliké avec succès !'}))
//             .catch(error => res.status(401).json({error: 'Le like est pas passé'}))
//         } else {
//             db.Like.destroy({where: {id:like.id} })
//             .then(() => res.status(200).json({message:'Like ou dislike retiré avec succès !'}))
//             .catch(error => res.status(401).json({error: 'Erreur voyons !'}));
//         }
//     })
//     .catch(error => res.status(404).json({error:'Post non trouvé !'}));
// };
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');

router.post('/',auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth,postCtrl.deletePost);
router.post('/:id/like',auth, postCtrl.likePost);


router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comments', auth, commentCtrl.getAllComments);
router.delete('/comment/:id', auth, commentCtrl.deleteComment);


router.post('/:id/like', auth, likeCtrl.likeOrDislikePost);


module.exports = router;
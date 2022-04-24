const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.post('/',auth, postCtrl.createPost )
router.get('/', postCtrl.getAllPosts )
router.get('/:id', postCtrl.getOnePost )
router.put('/:id', postCtrl.modifyPost )
router.delete('/:id', postCtrl.deletePost )
router.post('/:id/like', postCtrl.likePost )

module.exports = router;
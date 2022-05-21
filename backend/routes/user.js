const express = require("express");
const router = express.Router();

const passwordValidation = require('../middleware/password')
const rateLimiter = require('../middleware/rate-limit')
const auth = require('../middleware/auth')

const userCtrl = require("../controllers/user")


router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.put('/user/:id', auth, userCtrl.updateUser);
router.delete('/user/:id', auth, userCtrl.deleteUser);

module.exports = router;

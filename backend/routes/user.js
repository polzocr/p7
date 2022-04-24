const express = require("express");
const user = require("../models/user");
const router = express.Router();

const passwordValidation = require('../middleware/password')
const rateLimiter = require('../middleware/rate-limit')

const userCtrl = require("../controllers/user")


router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);

module.exports = router;

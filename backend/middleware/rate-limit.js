const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 600*60* 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message : {error:"Trop de tentatives, reessayer dans une heure !"}
});

module.exports = loginLimiter;
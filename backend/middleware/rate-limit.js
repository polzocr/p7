const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 60*60* 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message : "Reessayer dans une heure !"
});

module.exports = loginLimiter;
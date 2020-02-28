'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var db = require('../models');

var config = require('../config/config.json');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};

    options.secretOrKey = config.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.ignoreExpiration = false;

    passport.use(new JWTStrategy(options, function (JWTPayload, callback) {
        console.log(JWTPayload, 'hi ');
        db.users.findOne({where: {user_email: JWTPayload.user_email}})
            .then(function (user) {
                if (!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            }).catch(function (error) {
            console.log(error);
            res.sendStatus(403)
        })

        ;
    }));
}


module.exports = hookJWTStrategy;

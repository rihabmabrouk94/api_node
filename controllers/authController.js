'use strict';

var jwt = require('jsonwebtoken');
var bCrypt = require('bcryptjs');
var db = require('../models');
var config = require('../config/config');
// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function (req, res) {
    //console.log(req.body);
    if (!req.body.user_email || !req.body.user_passwordhash) {
        res.json({
            message: 'Please provide user email  and a password.'
        });
    } else {
        //console.log(req.body);
        var user = db.users.build();
        user.setPassword_hash(req.body.user_passwordhash);
        user.user_email = req.body.user_email;
        user.name = req.body.name;
        user.user_name = req.body.user_name;
        user.user_familyname = req.body.user_familyname;
        user.user_phonenumber = req.body.user_phonenumber;
        user.user_address = req.body.user_address;
        user.user_city = req.body.user_city;
        user.user_status = req.body.user_status;
        user.group_id = req.body.group_id;
        user.profile_id = req.body.profile_id;
        user.reset_password_token = "";
        user.active_account_token = "";
        user.client_id = null;

        user.save().then(function () {
            console.log('Account created');
            res.status(201).json({
                message: 'Account created!'
            });
        }).catch(function (error) {
            console.log(error);
            res.status(403).json({
                message: 'Username already exists!'
            });
        });

    }
}; // Authenticate a user.

AuthController.authenticateUser = function (req, res) {
    //console.log(req.body.user);
    if ((!req.body.user_email || !req.body.user_passwordhash) && (!req.body.user_name)){
        res.status(404).json({
            message: 'Email/Username and password are needed!'
        });
    } else {
        var user_email = req.body.user_email,
            user_passwordhash = req.body.user_passwordhash,
            user_name = req.body.user_name;
        if (req.body.user_email && req.body.user_passwordhash ) {
            db.users.findOne({
                include: [{
                    model: db.profiles,
                    as: 'profile',
                }],
                where: {
                    user_email: user_email,
                    active: 'Y'
                }
            }).then(function (user) {
                if (!user) {
                    res.send({
                        message: 'Email not  found!',
                        result: 0
                    })
                } else {
                    if (user.verifyPassword(user_passwordhash)) {

                        db.has_permissions.findAll({

                            include: [{
                                model: db.permissions,
                                as: 'permission',
                            }],
                            where: {
                                has_permissions_profild_id: user.profile.profile_id,
                            }
                        }).then(function (permissions) {

                            var token = jwt.sign({
                                id: user.id,
                                user_email: user.user_email,
                                profile: user.profile.profile_label,

                            }, config.secret, {
                                expiresIn: '86400s'
                            });

                            user.permissions = [];

                            permissions.forEach(permission => {
                                user.permissions.push(permission.permission.permission_label);
                            });
                            // let t = []
                            // t = user.permissions.filter(onlyUnique);
                            // user.permissions = t

                            res.json({
                                message: 'Success',
                                user: user.toJSON(),
                                success: true,
                                token: token,
                                permissions: permissions,
                                result: 1
                            });
                        })
                    } else {
                        res.send({
                            message: 'Wrong Password!',
                            result: 2
                        });
                    }

                }
            }).catch(function (error) {
                res.status(500).json({
                    message: 'There was an error!'
                });
            });
        }
        else if (req.body.user_name && req.body.user_passwordhash ){
            db.users.findOne({
                include: [{
                    model: db.profiles,
                    as: 'profile',
                }],
                where: {
                    user_name: user_name,
                    active: 'Y'
                }
            }).then(function (user) {
                if (!user) {
                    res.send({
                        message: 'Username not  found!',
                        result: 0
                    })
                } else {
                    if (user.verifyPassword(user_passwordhash)) {

                        db.has_permissions.findAll({

                            include: [{
                                model: db.permissions,
                                as: 'permission',
                            }],
                            where: {
                                has_permissions_profild_id: user.profile.profile_id,
                            }
                        }).then(function (permissions) {

                            var token = jwt.sign({
                                id: user.id,
                                user_name: user.user_name,
                                profile: user.profile.profile_label,

                            }, config.secret, {
                                expiresIn: '360m'
                            });

                            user.permissions = [];

                            permissions.forEach(permission => {
                                user.permissions.push(permission.permission.permission_label);
                            });
                            // let t = []
                            // t = user.permissions.filter(onlyUnique);
                            // user.permissions = t

                            res.json({
                                message: 'Success',
                                user: user.toJSON(),
                                success: true,
                                token: token,
                                permissions: permissions,
                                result: 1
                            });
                        })
                    } else {
                        res.send({
                            message: 'Wrong Password!',
                            result: 2
                        });
                    }

                }
            }).catch(function (error) {
                res.status(500).json({
                    message: 'There was an error!'
                });
            });
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
};
module.exports = AuthController;

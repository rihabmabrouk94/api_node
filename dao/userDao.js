var db = require('../models');
var bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
var crypto = require("crypto");
const {
    baseModelDao
} = require('./baseModalDao');


class UserDao extends baseModelDao {
    constructor() {
        super('users', 'user_id');
        this.baseModal = 'users';
        this.primaryKey = 'user_id';
    }

    insert_user(req, res, next) {

        var user = db.users.build(req.body);
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
        if (req.body.client_id) {
            user.client_id = req.body.client_id;
        } else {
            user.client_id = null;
        }

        console.log('password', user.user_passwordhash)
        var user_email = req.body.user_email;
        var user_name = req.body.user_name;
        db.users.findOne({
            where: {
                user_email: user_email,
                active : 'Y'
            }
        }).then(function (user_email) {

            if (!user_email) {
                db.users.findOne({
                    where: {
                        user_name: user_name,
                        active : 'Y'
                    }
                }).then(function (user_name) {
                    if (!user_name) {
                        user.save().then(function (u) {
                            console.log('User created');
                            res.status(201).json({
                                message: 'User created!',
                                data: u,
                                status: 1
                            });

                        }).catch(function (error) {
                            console.log(error);
                            res.status(500).json({
                                message: 'User not created',
                                error: error,
                                status: 0
                            });
                        });
                    }
                    else {
                        res.send({
                            message: 'Username already exists!',
                            status: 3
                        });
                    }
                })
            } else {
                res.send({
                    message: 'Email already exists!',
                    status: 2
                });
            }
        });
    }

    update_user(req, res, next) {
        var _id = req.body.user_id;
        //var salt = bcrypt.genSaltSync();

        db.users.update({
            //password_hash: bcrypt.hashSync(req.body.password_hash, salt),
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            user_familyname: req.body.user_familyname,
            user_phonenumber: req.body.user_phonenumber,
            user_address: req.body.user_address,
            user_city: req.body.user_city,
            user_status: req.body.user_status,
            group_id: req.body.group_id,
            profile_id: req.body.profile_id,
            reset_password_token: req.body.reset_password_token,
            active_account_token: req.body.active_account_token,
            client_id: req.body.client_id
        }, {
            where: {
                user_id: _id
            }
        })
            .then(result =>
                res.json(result)
            )
            .catch(err =>
                res.status(500).json(err)
            )
    }

    forgot_password(req, res, next) {
        var _id = req.body.user_id;

        console.log('req.body.user_passwordhash', req.body.user_passwordhash)
        var salt = bcrypt.genSaltSync();

        db.users.update({
            user_passwordhash: bcrypt.hashSync(req.body.user_passwordhash, salt)
        }, {
            where: {
                user_id: _id,
                active: 'Y'
            }
        })
            .then(result =>
            {
                console.log('update forgot password', result)
                res.json(result)
            }

            )
            .catch(err =>
                res.status(500).json(err)
            )
    }

    findUserById(req,res, next){

        db.users.findOne(
            {
            include: [{
                model: db.profiles,
                as: 'profile',

            }],
            where: {
                user_id: req.params.user_id,
                active: 'Y'
            }
        }).then(function (user) {

                if (user) {
                    db.has_permissions.findAll({

                        include: [{
                            model: db.permissions,
                            as: 'permission',
                        }],
                        where: {
                            has_permissions_profild_id: user.profile.profile_id,
                        }
                    }).then(function (permissions) {
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
                            permissions: permissions,
                            result: 1
                        });
                    })
                } else {
                    res.json({
                        message: 'Succsess',
                        user: user,
                        success: true,
                        permissions: [],
                        result: 0
                    });
                }
            }
        )
    }

    find_all(req, res, next) {
        db.users.findAll({
            include: [{
                model: db.groups
            },
                {
                    model: db.profiles
                },
            ]
        }).then(user => {
            res.json(user);
        });

    }


    send_email(req, res, next) {
        db.users.findOne({
            where: {
                user_email: req.body.user_email,
                active: 'Y'
            }
        }).then(function (user_email) {
            if (user_email) {
                var transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "marabout.technology@gmail.com",
                        pass: "marabout123"
                    }
                });
                var message = {
                    //from: process.env.email,
                    to: req.body.user_email,
                    subject: req.body.subject,
                    text: req.body.text,
                    html: req.body.html
                };
                transporter.sendMail(message, (err, info) => {
                    console.log('err', err);
                    console.log('info', info);
                    res.send({
                        success: true,
                        message: 'Done'
                    });
                });

            } else {
                res.send({
                    message: 'Email not exists',
                    result: 0
                });
            }
        })
    };

    send_email_without_passport(req, res, next) {


        db.users.findOne({
            where: {
                user_email: req.body.user_email,
                active: 'Y'
            }
        }).then(function (user_email) {

            if (user_email) {
                var transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "marabout.technology@gmail.com",
                        pass: "marabout123"
                    }
                });
                var message = {
                    //from: process.env.email,
                    to: req.body.user_email,
                    subject: req.body.subject,
                    text: req.body.text,
                    html: req.body.html
                };
                transporter.sendMail(message, (err, info) => {
                    console.log('err', err);
                    console.log('info', info);
                    res.send({
                        user: user_email,
                        success: true,
                        message: 'Done'
                    });
                });

            } else {
                res.send({
                    message: 'Email not exists',
                    result: 0
                });
            }
        })
    };

    find_user_by_profile(req, res, next) {
        db.users.findAll({
            include: [{
                model: db.profiles,
                attributes: [
                    [
                        'profile_id', 'value'
                    ],
                    ['profile_label', 'label']
                ],
                where: {
                    profile_label: req.body.profile_label
                }
            }]

        }).then(function (profile) {
            res.json(profile);
        })
    };


    find_user_by_reset_password_token(req, res, next) {

        console.log('------------------------------- find_user_by_reset_password_token');
        console.log('userid',req.params.user_id)
        console.log('token', req.params.token)

        db.users.findOne({

            where: {
                user_id: req.params.user_id,
                reset_password_token: req.params.token
            }
        })
            .then(user => {
                if (user) {
                    res.json({
                        result: 1,
                        message: 'success',
                        user: user
                    })
                } else {
                    res.json({
                        result: 0,
                        message: 'User Not Found',
                        user: {}
                    })
                }

            })
            .catch(err =>
                res.status(500).json(err)
            )
    };

    random_reset_password_token(req, res, next) {

        var salt = bcrypt.genSaltSync();
        crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.toString('hex');

            db.users.update({
                reset_password_token: token
            }, {
                where: {
                    user_id: req.body.user_id,
                    active: 'Y'
                }
            }).then(user => {
                res.send({
                    user: user,
                    message: 'updated reset-password'
                });
            })
        });

    }

    init_reset_password_token(req, res, next) {
        var salt = bcrypt.genSaltSync();
        console.log(req.body);
        db.users.update({
            reset_password_token: req.body.reset_password_token
        }, {
            where: {
                user_id: req.body.user_id,
                active : 'Y'
            }
        }).then(user => {
            res.send({
                user: user,
                message: 'Init'
            });
        })
    }

    send_email_forgot_password(req, res, next) {

        console.log('-------------------------send_email_forgot_password' );


        var salt = bcrypt.genSaltSync();
        crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.toString('hex');

            db.users.update({
                reset_password_token: token
            }, {
                where: {
                    user_email: req.body.user_email,
                    active: 'Y'
                }
            }).then(result => {

                if (result == 1) {


                    db.users.findOne({
                        where: {
                            user_email: req.body.user_email,
                            active: 'Y'
                        }
                    }).then(function (user) {

                        if (user) {

                            var transporter = nodemailer.createTransport({
                                service: "Gmail",
                                auth: {
                                    user: "marabout.technology@gmail.com",
                                    pass: "marabout123"
                                }
                            });

                            let url = req.body.url;
                            var message = {
                                //from: process.env.email,
                                to: user.user_email,
                                subject: 'Marabout Technology - Forgot Password',
                                // html: 'hello'
                                html: '<b>Thank you for joining Marabout Technology</b><br><span style="color: red">Please change your password By <a href="' + url + '/resetpassword/' + user.user_id + '/' + user.reset_password_token + '">clicking here</a></span>'
                            };

                            transporter.sendMail(message, (err, info) => {
                                console.log('err', err);
                                console.log('info', info);
                                res.send({
                                    user: user,
                                    success: true,
                                    message: 'Done'
                                });
                            });

                        } else {

                            res.send({
                                message: 'Email not exists',
                                result: 0
                            });

                        }

                    });


                } else {
                    res.send({
                        message: 'A problem has occured',
                        result: 0
                    })
                }

            });

        })
    }

    send_email_active_account(req, res, next) {

        var salt = bcrypt.genSaltSync();
        crypto.randomBytes(20, function (err, buffer1) {

            crypto.randomBytes(20, function (err, buffer2) {
                var token = buffer1.toString('hex');
                var token2 = buffer2.toString('hex');


                db.users.update({
                    active_account_token: token,
                    reset_password_token: token2
                }, {
                    where: {
                        user_email: req.body.user_email,
                        active: 'Y'
                    }
                }).then(result => {

                    if (result == 1) {

                        db.users.findOne({
                            where: {
                                user_email: req.body.user_email,
                                active: 'Y'
                            }
                        }).then(function (user) {

                            if (user) {

                                var transporter = nodemailer.createTransport({
                                    service: "Gmail",
                                    auth: {
                                        user: "marabout.technology@gmail.com",
                                        pass: "marabout123"
                                    }
                                });

                                let url = req.body.url;
                                var message = {
                                    //from: process.env.email,
                                    to: user.user_email,
                                    subject: 'Marabout Technology - Active Account',
                                    // html: 'hello'
                                    html: '<b>Thank you for joining Marabout Technology</b><br><span style="color: red">Please active your account By <a href="' + url + '/activeaccount/' + user.user_id + '/' + user.active_account_token + '">clicking here</a></span>'
                                };

                                transporter.sendMail(message, (err, info) => {
                                    console.log('err', err);
                                    console.log('info', info);
                                    res.send({
                                        user: user,
                                        success: true,
                                        message: 'Done'
                                    });
                                });

                            } else {

                                res.send({
                                    message: 'Email not exists',
                                    result: 0
                                });

                            }

                        });


                    } else {
                        res.send({
                            message: 'A problem has occured',
                            result: 0
                        })
                    }

                });
            })
        })
    }

    find_user_by_active_account_token(req, res, next) {
        console.log('-------------------- find_user_by_active_account_token')
        console.log('-------------------- req.params.user_id', req.params.user_id)
        console.log('-------------------- req.params.token', req.params.token)

        db.users.findOne({

            where: {
                user_id: req.params.user_id,
                active_account_token: req.params.token
            }
        })
            .then(user => {
                if (user) {
                    res.json({
                        result: 1,
                        message: 'success',
                        user: user
                    })
                } else {
                    res.json({
                        result: 0,
                        message: 'User Not Found',
                        user: {}
                    })
                }

            })
            .catch(err =>
                res.status(500).json(err)
            )
    };
}

module.exports = UserDao;


// var find_by_searchQuery = function (req, res, next) {
//   let limit = req.params.limit; // number of records per page
//   let offset = 0;

//     db.users.findAndCountAll({
//         where: {
//           $or: [{
//             user_name: {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               user_familyname: {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               user_email: {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               user_address: {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               user_city: {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               '$profile.profile_label$': {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               '$client.client_label$': {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             },
//             {
//               '$group.group_label$': {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             }

//           ]
//         },
//         include: [{
//             model: db.groups,
//             as : 'group'
//           },
//           {
//             model: db.profiles,
//             as: 'profile'
//           },
//           {
//             model: db.clients,
//             as : 'client'
//           }
//         ]

//       })
//       .then((data) => {

//         let page = req.params.page; // page number
//         let pages = Math.ceil(data.count / limit);
//         offset = limit * (page - 1);


//         db.users.findAll({
//           where: {
//             $or: [{
//               user_name: {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 user_familyname: {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 user_email: {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 user_address: {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 user_city: {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 '$profile.profile_label$': {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 '$client.client_label$': {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               },
//               {
//                 '$group.group_label$': {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               }
//             ]
//           },
//           include: [{
//               model: db.groups,
//               as : 'group'
//             },
//             {
//               model: db.profiles,
//               as: 'profile'
//             },
//             {
//               model: db.clients,
//               as : 'client'
//             }
//           ],
//           limit: limit,
//           offset: offset,
//           $sort: {
//             id: 1
//           }
//         }).then(users => {
//           res.status(200).json({
//             'result': users,
//             'Total': data.count,
//             'totalPage': pages
//           });
//         })


//       })
//       .catch(error => {
//         res.status(500).json(error);
//       })
//     }


// var find_by_client = function (req, res, next) {
//   let limit = req.params.limit; // number of records per page
//   let offset = 0;

//     db.users.findAndCountAll({
//         where: {
//           $or: [{
//                '$client.client_label$': {
//                 ilike: '%' + req.body.searchQuery + '%'
//               }
//             }
//           ]
//         },
//         include: [{
//             model: db.groups,
//             as : 'group'
//           },
//           {
//             model: db.profiles,
//             as: 'profile'
//           },
//           {
//             model: db.clients,
//             as : 'client'
//           }
//         ]

//       })
//       .then((data) => {

//         let page = req.params.page; // page number
//         let pages = Math.ceil(data.count / limit);
//         offset = limit * (page - 1);


//         db.users.findAll({
//           where: {
//             $or: [
//               {
//                 '$client.client_label$': {
//                   ilike: '%' + req.body.searchQuery + '%'
//                 }
//               }
//             ]
//           },
//           include: [{
//               model: db.groups,
//               as : 'group'
//             },
//             {
//               model: db.profiles,
//               as: 'profile'
//             },
//             {
//               model: db.clients,
//               as : 'client'
//             }
//           ],
//           limit: limit,
//           offset: offset,
//           $sort: {
//             id: 1
//           }
//         }).then(users => {
//           res.status(200).json({
//             'result': users,
//             'Total': data.count,
//             'totalPage': pages
//           });
//         })


//       })
//       .catch(error => {
//         res.status(500).json(error);
//       })
//     }

//     var updateEtat = function (req, res, next) {

//           db.users.update({

//             user_status: req.body.user_status

//           }, {
//             where: {
//               user_id: req.params.user_id
//             }
//           })
//           .then(result =>
//             res.json(result)
//           )
//       }

// module.exports = {
//   add: insert_user,
//   delete: delete_user,
//   update: update_user,
//   find_all: find_all,
//   find_by_id: find_by_id,
//   options: options,
//   send_email: send_email,
//   find_all_page: find_all_page,
//   send_email_without_passport: send_email_without_passport,
//   find_user_by_profile: find_user_by_profile,
//   forgot_password: forgot_password,
//   find_user_by_reset_password_token: find_user_by_reset_password_token,
//   random_reset_password_token: random_reset_password_token,
//   send_email_forgot_password: send_email_forgot_password,
//   init_reset_password_token: init_reset_password_token,
//   send_email_active_account: send_email_active_account,
//   find_user_by_active_account_token: find_user_by_active_account_token,
//   find_by_searchQuery: find_by_searchQuery,
//   find_by_client: find_by_client,
//   updateEtat: updateEtat
// };

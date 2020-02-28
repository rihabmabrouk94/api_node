const {baseModelDao} = require('./baseModalDao');

class ProfileDao extends baseModelDao {
    constructor() {
        super('profiles', 'profile_id');
        this.baseModal = 'profiles';
        this.primaryKey = 'profile_id';
    }

    getProfiles(req, res, next) {
        return this.find(req, res, next);
    }

    alterGetDataFind(data, res, attributes_res) {
        if (data && data.length) {
            let async = require('async');
            let db = this.db;
            async.each(data, function (profile, callback) {
                profile.permissions = [];
                db['has_permissions'].findAll({
                    include: [
                        {
                        model: db['permissions'],
                        as: 'permission'
                        },
                        // {
                        //     model: db['profiles'],
                        //     as: 'profile',
                        // }
                    ],
                    where: {
                       // '$profile.active$': 'Y',
                        has_permissions_profild_id: profile.profile_id
                    }
                }).then(function (datapermissions) {
                    datapermissions.forEach(permission => {
                        profile.permissions.push(permission.permission.permission_id);
                    });
                    profile.permissions = profile.permissions.filter((v, i) => profile.permissions.indexOf(v) === i)
                    callback();
                });
            }, function (err) {
                if (err) {
                    return console.log(err);
                }
                res.status(200).json({
                    'data': data,
                    'attributes': attributes_res
                })
            });
        } else {
            res.status(200).json({
                'data': data,
                'attributes': attributes_res
            })
        }
    }
}
module.exports = ProfileDao;

const {baseModelDao} = require('./baseModalDao');

class HasPermissionsDao extends baseModelDao {
    constructor() {
        super('has_permissions', 'has_permissions_id');
        this.baseModal = 'has_permissions';
        this.primaryKey = 'has_permissions_id';
    }

    updateHasPermission(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['has_permissions'].findAll({
            include: [{
                model: this.db['permissions'],
                as: 'permission',
            }],
            where: {

                has_permissions_profild_id: params.profile_id
            }
        }).then(data => {
            var oldPermissions = [];

            data.forEach(permission => {
                oldPermissions.push(permission.permission.permission_id);
            });

            if (params && params.permissions) {

                params.permissions.forEach(newPermission => {

                    if(oldPermissions.indexOf(newPermission) === -1) {

                        // add has_permissions
                        var modalObj = this.db[this.baseModal].build({
                            has_permissions_profild_id: params.profile_id,
                            has_permissions_permission_id: newPermission
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldPermissions.forEach(oldPermission =>{
                    if(params.permissions.indexOf(oldPermission)==-1){
                        // delete has_permission

                       this.db['has_permissions'].destroy(
                            {
                                where : {
                                    has_permissions_profild_id: params.profile_id,
                                    has_permissions_permission_id: oldPermission
                                }
                            }).then(res=>{})
                    }
                })
            }
            res.send(oldPermissions)
        })
    }
}

module.exports = HasPermissionsDao;

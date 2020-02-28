const {baseModelDao} = require('./baseModalDao');

class MachineGroupsDao extends baseModelDao {
    constructor() {
        super('machine_groups', 'machine_group_id');
        this.baseModal = 'machine_groups';
        this.primaryKey = 'machine_group_id';
    }

    updateMachineGroup(req, res, next) {
        let params = req.params.params;
        params = (params && params.length) ? JSON.parse(params) : {};

        this.db['machine_groups'].findAll({
            include: [{
                model: this.db['groups'],
                as: 'group',
            }],
            where: {

                machine_id: params.machine_id
            }
        }).then(data => {
            var oldGroups = [];

            data.forEach(group => {
                oldGroups.push(group.group.group_id);
            });

            if (params && params.groups) {

                params.groups.forEach(newGroup => {

                    if(oldGroups.indexOf(newGroup) === -1) {

                        // add has_permissions
                        var modalObj = this.db[this.baseModal].build({
                            machine_id: params.machine_id,
                            group_id: newGroup
                        });

                        modalObj.save().then(result => {

                        });

                    }
                })
                oldGroups.forEach(oldGroups =>{
                    if(params.groups.indexOf(oldGroups)==-1){
                        // delete has_permission

                        this.db['machine_groups'].destroy(
                            {
                                where : {
                                    machine_id: params.machine_id,
                                    group_id: oldGroups
                                }
                            }).then(res=>{})
                    }
                })
            }
            res.send(oldGroups)
        })
    }
}

module.exports = MachineGroupsDao;

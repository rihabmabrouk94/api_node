const {baseModelDao} = require('./baseModalDao');

class MachineEventsDao extends baseModelDao {
    constructor() {
        super('machine_events', 'machine_evt_id');
        this.baseModal = 'machine_events';
        this.primaryKey = 'machine_evt_id';
    }

    getByMachineId(req, res, next) {
        let machine_id = req.params.machine_id;
        let _this = this;

        _this.db['machine_events'].findAll( {
            where : {
                machine_id: machine_id
            },
            include : [
                {
                    model: _this.db['events']
                },
                {
                    model: _this.db['machine_event_types']
                }
            ]

        }).then(machine_events =>  {

            res.send({
                data: machine_events
            });
            return;

        });

    }
}

module.exports = MachineEventsDao;

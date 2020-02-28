const {baseModelDao} = require('./baseModalDao');

class MaintenanceFeedDao extends baseModelDao {
    constructor() {
        super('maintenance_feeds', 'maintenance_feed_id');
        this.baseModal = 'maintenance_feeds';
        this.primaryKey = 'maintenance_feed_id';
    }

    insert_maintenance_feed(req, res, next) {
        let _this = this;
        _this.db['maintenance_tasks'].findOne({
            where: {
                bug_description: req.body.bug_description
            }
        }).then((maintenance_tasks) => {
            if(maintenance_tasks) {
                var maintenance_feed = _this.db['maintenance_feeds'].build(req.body);
                maintenance_feed.maintenance_task_id = maintenance_tasks.maintenance_task_id;
                maintenance_feed.save().then(maintenance_feeds => {
                    if(maintenance_feeds) {
                        res.json({
                            success: true,
                            data: {
                                maintenance_feeds: maintenance_feeds
                            },
                            messages: [{
                                userMessage: "Maintenance Feed created with success",
                                internalMessage: 'Maintenance Feed created with success',
                                code: 10010,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10010"
                            }],
                            attributes: [],
                            status: 200
                        });
                    }else{
                        res.json({
                            success: false,
                            data:null,
                            messages: [{
                                userMessage: "Maintenance Feed not created",
                                internalMessage: 'Maintenance Feed not created',
                                code: 10007,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/10007"
                            }],
                            attributes: [],
                            status: 200
                        });
                    }
                })
            }
        })
    }

}

module.exports = MaintenanceFeedDao;

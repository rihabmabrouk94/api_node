const {baseModelDao} = require('./baseModalDao');

class NotificationReadDao extends baseModelDao {
    constructor() {
        super('notification_reads', 'notification_read_id');
        this.baseModal = 'notification_reads';
        this.primaryKey = 'notification_read_id';
    }
    readAllMessage(req, res, next) {
        let _this = this;
        _this.db['notification_reads'].findAll({
            where: {
                read: 'N'
            }
        }).then(notification_reads => {
            if (notification_reads) {
                _this.db['notification_reads'].update({
                        read :'Y',
                        date_read: req.query.date_read},
                    {
                        where:{
                            read : 'N'
                        }
                    }
                ).then(result => {
                    if(result) {
                        res.json({
                            success: true,
                            data: result,
                            messages: [{
                                userMessage: "Notification Read with success",
                                internalMessage: 'Notification Read with success',
                                code: 9003,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9003"
                            }],
                            attributes: [],
                            status: 200
                        })
                    }else{
                        res.json({
                            success: false,
                            data: null,
                            messages: [{
                                userMessage: "Notification Already Read",
                                internalMessage: 'Notification Already Read',
                                code: 9004,
                                more_info: "http://marabout-fixture-api.dev-fnode.com/api/v1/doc/debug/9004"
                            }],
                            attributes: [],
                            status: 500
                        });
                    }
                })
            }
            })


    }

}

module.exports = NotificationReadDao;

const {baseModelDao} = require('./baseModalDao');
const fs = require('fs');
var appDir = require('path').dirname(require.main.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

class PrinterDao extends baseModelDao {
    constructor() {
        super('printers', 'printer_id');
        this.baseModal = 'printers';
        this.primaryKey = 'printer_id';
    }

    printBundle(req, res, next) {
        let _this = this;
        let bundle_id = req.params.bundle_id;
        _this.db['bundles'].findOne({
            where: {
                bundle_id: req.params.bundle_id,
            }
        })
            .then(bundle => {
                if (bundle) {
                    _this.db['printers'].findOne({
                        where: {
                            printer_id: bundle.printer_id
                        }
                    })
                        .then(printer => {
                            if (printer) {
                                var ping = require('ping');
                                var hosts =[printer.printer_ip];
                                hosts.forEach(function(host) {
                                    ping.sys.probe(hosts, function (isAlive) {
                                        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                                        console.log('msggggggg', msg);

                                        console.log('config', config)

                                        if (isAlive){
                                            _this.readFilePrinter(bundle_id).then(function (fileCardPath) {

                                                let cmd = 'curl -X POST -F file=@' + fileCardPath+ ' ' + '-F badge=yes -F count=1 -F callback=' + config.printerCallbackUrlApi + '/callback/bundle/' + bundle.bundle_id + ' '+ '-F mode=lazy ' + printer.printer_ip + ':' + printer.port + '/print'
                                                console.log('cmd', cmd)
                                                var exec = require('child_process').exec;
                                                exec(cmd, function(error, stdout, stderr){
                                                    res.json({
                                                        success: true,
                                                        data: null,
                                                        messages: ['Start Printing']
                                                    });
                                                });

                                            })
                                        }else{
                                            res.json({
                                                success: false,
                                                data: null,
                                                messages: ['Printer ip is down']
                                            });
                                        }

                                    });
                                })
                            }
                            else{
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: ['Printer not exists']
                                });
                            }
                        })
                } else {
                    res.json({
                        success: false,
                        data: null,
                        messages: ['Bundle not exists']
                    });
                }

            })

    }

    printCallbackAction(req, res, next) {
        console.log('testtttttttttttttttt')
        let _this = this;
        let bundle_id = req.params.bundle_id;
        _this.db['bundles'].findOne({
            where: {
                bundle_id: bundle_id
            }
        })
            .then(bundle => {
                console.log('req.query', req.query)
                    if (bundle) {
                        let nbCarts = bundle.card_pcs;
                        let dataSource = req.query.response;
                        dataSource = decodeURIComponent(dataSource);
                        dataSource = dataSource.split(";");
                        var rfids = [];

                        for (var i = 0; i < dataSource.length; i++) {
                            if (dataSource[i] && dataSource[i] !== "") {
                                rfids.push(dataSource[i].replace('SUCCESS/BADGEID:', ''));
                                console.log('rfids', rfids)
                                console.log('dataSource', dataSource)

                            }
                        }
                        rfids.forEach(function (rfid) {
                            var cart = _this.db['carts'].build(req.body);
                            cart.created_at = Date.now();
                            cart.rfid_cart = rfid.substring(0, 10);
                            cart.save().then(carts => {
                                var bundle_cart = _this.db['bundle_carts'].build(req.body);
                                bundle_cart.affected_at = Date.now();
                                bundle_cart.bundle_id = bundle_id;
                                bundle_cart.cart_id = cart.cart_id;
                                bundle_cart.save().then(carts => {
                                    res.send(
                                        'OK'
                                    );
                                })




                            })
                        });
                        return 'OK';
                    }
                }
            ).catch(err =>
            res.status(500).json(err)
        )
    }

    readFilePrinter(bundle_id) {
        let _this = this;
        // let bundle_id = req.params.bundle_id;
        return new Promise(function (resolve, reject) {

            _this.db['bundles'].findOne({
                where: {
                    bundle_id: bundle_id
                }
            })
                .then(bundle => {
                    _this.db['orders'].findOne({
                        where: {
                            order_id: bundle.order_id
                        }
                    })
                        .then(order => {
                            _this.db['articles'].findOne({
                                where: {
                                    article_id: order.article_id
                                }
                            })
                                .then(article => {
                                    _this.db['clients'].findOne({
                                        where: {
                                            client_id: order.client_id
                                        }
                                    }).then(client => {
                                        const dataCard = {
                                            name: 'RFID',
                                            bundle_id: bundle_id,
                                            rfid: '{%rfid%}',
                                            article: article.label,
                                            code_bundle: bundle.code_bundle,
                                            size: 'Size: ' + bundle.size1,
                                            variant1: 'Color: ' + bundle.variant1,
                                            variant2: bundle.variant2,
                                            client: 'Client: '+ client.client_label,
                                            bundle_qte: 'Qte: '+ bundle.bundle_qte
                                        };
                                        writeFilePrinter(dataCard).then(function (fileCardPath) {

                                            resolve(fileCardPath)

                                        })
                                    })
                                })
                        })
                })
        })
    }

    statusPrint(req, res, next) {

        let _this = this;
        let bundle_id = req.params.bundle_id;

        _this.db['bundles'].findOne({
            where: {
                bundle_id: bundle_id,
                active: 'Y'
            }
        })
            .then(bundle => {
                if (bundle) {
                    _this.db['printers'].findOne({
                        where: {
                            printer_id: bundle.printer_id,
                            printer_status: true,
                            active: 'Y'
                        }
                    })
                        .then(printer => {
                            if (printer) {
                                res.json({
                                    success: true,
                                    data: printer,
                                    messages: ['Printer is connected']
                                });
                            } else {
                                res.json({
                                    success: false,
                                    data: null,
                                    messages: ['Printer not connected']
                                });
                            }
                        })
                } else {
                    res.json({
                        success: false,
                        data: null,
                        messages: ['Bundle not exists']
                    });
                }
            })
    }
}

module.exports = PrinterDao;

function writeFilePrinter(data) {
    data = Object.assign({
        name: null,
        bundle_id: null,
        rfid: null,
        article: null,
        code_bundle: null,
        size: null,
        variant1: null,
        variant2: null,
        client: null,
        bundle_qte: 0
    }, data);

    return new Promise(function (resolve, reject) {
        var exec = require('child_process').exec;
        let fileCardPath = appDir + '/resources/cards/bundle-cart-' + data.bundle_id + '.txt';
        const cmd_rm = "rm " + fileCardPath + " -y";
        exec(cmd_rm, function(error, stdout, stderr){
            var stream = fs.createWriteStream(fileCardPath);
            stream.once('open', (fd) => {
                stream.write("Eraser\n");
                stream.write('PrintText(0,0,17,0,1,1, "' + ((data.name) ? data.name : "") + '")\n');
                stream.write('PrintText(0,0,40,0,1,1,"' + ((data.rfid) ? data.rfid : "") + '")\n');
                stream.write('PrintText(0,2,93,2,1,1,"' + ((data.article) ? data.article : "") + '")\n');
                stream.write('PrintText(0,2,136,2,1,1,"' + ((data.code_bundle) ? data.code_bundle : "") + '")\n');
                // stream.write('//PrintText(0,110,136,2,1,1,"' + data.size + '")\n');
                stream.write('PrintText(0,30,250,2,1,1,"' + ((data.variant1) ? data.variant1 : "") + '")\n');
                stream.write('PrintText(0,30,290,2,1,1,"' + ((data.variant2) ? data.variant2 : "") + '")\n');
                stream.write('PrintText(0,30,336,2,1,1,"' + ((data.client) ? data.client : "") + '")\n');
                stream.write('PrintText(0,30,200,2,1,1,"' + ((data.bundle_qte) ? data.bundle_qte : "") + '")\n');
                stream.write("PrintText(0,30,415,2,1,1,\"\")\n");
                stream.write("PrintText(0,30,415,2,1,1,\"\")\n");
                stream.write("Exit(1)\n");
                stream.write("PrintStart(0)\n");
                console.log("Card file created with success!");
                stream.end();

                let cmd_perl = 'perl -pi -e "s/\\n/\\r\\n/" ' + fileCardPath;

                var exec = require('child_process').exec;
                exec(cmd_perl, function(error, stdout, stderr){
                    console.log('exc cmd_perl', cmd_perl);
                    resolve(fileCardPath);
                });
        });

        });

    });
}

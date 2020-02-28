var express = require('express'),

    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    path = require('path');
var cors = require('cors');
const fs = require('fs');
var url = require('url');
var timeout = require('connect-timeout')






var hookJWTStrategy = require('./services/passportStrategy');

var db = require('./models');

var app = express();
app.use(timeout('60s'))
// the !! operator will evalute the ENV variable and if it's set it will get it's value and if not it will convert "undefined" to false
var sync = !!process.env.SYNC; // using "npm run prodsync" will run the app using the prod config and recreate the DB
// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
// Hook up the HTTP logger.
app.use(morgan('dev'));
app.use(passport.initialize());



hookJWTStrategy(passport);
app.all('*', function (req, res, next) {


    const env = process.env.NODE_ENV || 'development';
    const config = require(__dirname + '/config/config.json')[env];

    if (config.debug_url) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        fs.appendFile('log_request.log', req.url + ': ' + JSON.stringify(query) + "\n", function (err) {
            if (err) throw err;
        });
    }

    console.log(req.header("Authorization"));
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization ,Accept');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    console.log(req.header("Authorization"));
    next();


});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Bundle API routes.
app.use('/api', require('./routes/api')(passport));

app.get('/', function (req, res) {
    res.send('hello world');
});
app.listen(3000, function () {
    if (sync) {
        console.log("synchronizing database");
        db.sequelize.sync({force: true});
    }
});

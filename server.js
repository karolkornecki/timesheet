var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var ACCOUNT_FILE = path.join(__dirname, 'mocks/account.json');

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    //CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.post('/api/authentication', function (req, res) {
    if (req.body['j_username'] === 'admin' && req.body['j_password'] === 'admin') {
        res.status(200).send('Authentication success')
    } else {
        res.status(500).send('Authentication failed')
    }
});
app.post('/api/logout', function (req, res) {
    res.status(200).send('Logout success')
});

app.get('/api/account', function (req, res) {
    fs.readFile(ACCOUNT_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/account', function (req, res) {
    if (req.body['email'] === 'admin@admin.pl') {
        res.headers['X-Timesheetapp-Error'] = 'Code 400: bad request'
        res.status(400).send('Bad request')
    } else if (req.body['email'] === 'system@system.pl') {
        res.headers['X-Timesheetapp-Error'] = 'Code 500: internal error'
        res.status(500).send('Internal server error')
    } else {
        fs.readFile(ACCOUNT_FILE, function (err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            var account = JSON.parse(data);
            account.firstName = req.body.firstName
            account.lastName = req.body.lastName
            account.email = req.body.email
            account.langKey = req.body.langKey
            fs.writeFile(ACCOUNT_FILE, JSON.stringify(account, null, 4), function (err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
            res.status(200).send("Success")
        });
    }
});


app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

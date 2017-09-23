/**
 * Created by doga on 22/10/2016.
 */

var logger = require('./lib/logger')(),
    connect = require('connect'),
    CORS = require('cors'),
    checkUserFromDatabase = require('./lib/validation-service.js').checkUserFromDatabase,
    isBlackListed = require('./lib/blacklist.js').IsBlackListed,
    isIpBlackListed = require('./lib/blacklist.js').isBlacklistIp,
    config = require('./resources/config.js');

var app = connect();

app.use('*', CORS())
    .use(config.server.path, function (req, res) {
        if (req.method === 'GET') {
            tokenReturn(req, res);
        }
    });


app.listen(config.server.port, function () {
    console.log("Listening on " + config.server.port);
});


function tokenReturn(req, res) {
    if (req.headers.authorization !== undefined) {
        req.headers.authorize = req.headers.authorization;
    }
    if (req.headers.authorize == undefined) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log(req.headers)
    if (!/(^\S+\s{1}\S+$)/.test(req.headers.authorize)) {
        res.statusCode = 400;
        res.end();
        return;
    }
    var authorizeHeader = req.headers.authorize.split(" ");
    // TODO jwt is currently supported but will be deprecated
    if (authorizeHeader.length === 2) {
        var method = authorizeHeader[0];
        var encoded_user_pass = authorizeHeader[1];
    } else {
        res.statusCode = 400;
        res.end();
        return;
    }
    ;
    var user_info = encoded_user_pass.split(":");
    if (user_info.length !== 2) {
        res.statusCode = 401;
        res.end();
        return;
    }

    var user = user_info[0],
        password = user_info[1];
    var clientIp = (req.connection.remoteAddress).toString();
    if (user === "" || password === "") {
        res.statusCode = 401;
        res.end();
        return;
    }
    var reqObj = {
        "method": method,
        "credentials": {uid: user, "password": password}
    };
    var token;
    isIpBlackListed(clientIp, function (answer) {
        if (answer === true) {
            res.end();
            return;

        }
        isBlackListed(reqObj.credentials.uid, function (result) {
            if (result === true) {
                res.end();
                return;
            }
            checkUserFromDatabase(reqObj, clientIp, result, answer, function (err, result) {
                token = result;
                console.log(token);
                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.write(JSON.stringify(result));
                res.end();
            });
        });

    })
}


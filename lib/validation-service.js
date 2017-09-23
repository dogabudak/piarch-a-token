/**
 * Created by doga on 06/01/15.
 */

var logger = require('./logger')(),
    CryptoJS = require("crypto-js"),
    get_jwt = require('./jwt-tokenizor'),
    config = require('../resources/config'),
    jwt = require('jsonwebtoken'),
    updateBlacklist = require('./blacklist.js').updateBlackList,
    updateIpBlacklist = require('./blacklist.js').updateIpBlackList,
    TTL = require('./blacklist.js').TTL,
    ipTTL = require('./blacklist.js').ipTTL,
    mongojs = require('mongojs'),
    db = mongojs(config.mongo.url,['users']);





function createHash(password) {
    return CryptoJS.SHA256(password).toString();
}
//TODO passwords in not hashed yet
function checkUserFromDatabase(user_info, client_ip, try_count, ip_try_count, callbackfunction) {
    var user = user_info.credentials.uid;
    var password = user_info.credentials.password;
    var token;
    db.users.find({"username":user},function (err, reply) {
        if (reply.length > 1){
            callbackfunction(null, {"authenticated": false, "token": null});
            return;
        }
        if (err) {
            logger.error(err);
            callbackfunction(err, null);
            return;
        }
        if (reply === null || reply === undefined || reply.length === 0) {
            updateBlacklist(user, try_count, function (thatcallback) {
                if (thatcallback == true) {
                    TTL(user);
                }
            });
            updateIpBlacklist(client_ip, ip_try_count, function (thiscallback) {
                if (thiscallback == true) {
                    ipTTL(client_ip);
                }
            });
            callbackfunction(null, {"authenticated": false, "token": null});
            return;
        } else if (reply[0].password == password) {
            token = get_jwt(user_info,'piarch_a');
            console.log(token)
            callbackfunction(null, {"authenticated": true, "token": token});
            return;
        }else {
            updateBlacklist(user,try_count,function(thatcallback){
                if (thatcallback == true) {
                    TTL(user);
                }
            });
            updateIpBlacklist(client_ip,ip_try_count,function(thiscallback){
                if (thiscallback ==true) {
                    ipTTL(client_ip);
                }
            });
            callbackfunction(null, {"authenticated": false, "token": null});
            return;
        }
    });
}
module.exports = {
    checkUserFromDatabase: checkUserFromDatabase
};
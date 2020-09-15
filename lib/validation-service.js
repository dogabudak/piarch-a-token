/**
 * Created by doga on 06/01/15.
 */

const CryptoJS = require("crypto-js"),
      get_jwt = require('./jwt-tokenizor'),
      config = require('../resources/config'),
      mongojs = require('mongojs'),
      db = mongojs(config.mongo.url,['users']);





function createHash(password) {
    return CryptoJS.SHA256(password).toString();
}
//TODO passwords in not hashed yet
  function checkUserFromDatabase(user_info) {
  return new Promise(
    function(fullfill,reject){
    var user = user_info.credentials.uid;
    var password = user_info.credentials.password;
    var token;
    // TODO use async await rather than callbacks

    db.users.find({"username":user},function (err, reply) {
        if (reply.length > 1){
            reject({"authenticated": false, "token": null});
        }
        if (err) {
          reject({"authenticated": false, "token": null});
        }
        if (reply.length === 0) {
            reject({"authenticated": false, "token": null});
        } else if (reply[0].password === password) {
            token = get_jwt(user_info,'piarch_a');
            let tokenObj = {"authenticated": true, "token": token};
            fullfill(tokenObj);
        }else {
            reject({"authenticated": false, "token": null});
        }
    });
  }
  )
}
module.exports = {
    checkUserFromDatabase: checkUserFromDatabase
};

/**
 * Created by doga on 06/01/15.
 */

const CryptoJS = require("crypto-js");
const get_jwt = require('./jwt-tokenizor');
const config = require('../resources/config');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.mongo.url, { useNewUrlParser: true });





function createHash(password) {
    return CryptoJS.SHA256(password).toString();
}
//TODO passwords in not hashed yet
  function checkUserFromDatabase(user_info) {
  return new Promise((fullfill,reject) => {
      //TODO this connects everytime i have a call and disconnects when it is finished
    client.connect(err => {
    const collection = client.db("piarka").collection("users");
    const user = user_info.credentials.uid;
    const password = user_info.credentials.password;
    let token;
    // TODO use async await rather than callbacks
        collection.find({"username":user}).toArray((err, reply) => {
         //TODO fix state when reply is undefined
        if (reply.length > 1){
            //TODO create it as a singleton rather tan putting this close to everywhere
            client.close();
            reject({"authenticated": false, "token": null});
        }
        if (err) {
            client.close();
            reject({"authenticated": false, "token": null});
        }
        if (reply.length === 0) {
            client.close();
            reject({"authenticated": false, "token": null});
        } else if (reply[0].password === password) {
            token = get_jwt(user_info,'piarch_a');
            let tokenObj = {"authenticated": true, "token": token};
            client.close();
            fullfill(tokenObj);
        }else {
            reject({"authenticated": false, "token": null});
        }
    });
      });
  })
}
module.exports = {
    checkUserFromDatabase: checkUserFromDatabase
};

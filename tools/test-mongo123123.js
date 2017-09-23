/**
 * Created by doga on 02/11/2016.
 */
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/users', ['users']);

db.users.find({"username":"Dogab12"},function (err, docs) {
    console.log(docs)

});
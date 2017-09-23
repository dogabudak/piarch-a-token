/**
 * Created by doga on 25/10/2016.
 */
var db = MongoClient.connect(url);

var findUser = function(db, callback) {
    var collection = db.collection('users');

    collection.find( { "user_name:Password": "Manhattan" } ).toArray(function(err, docs) {




        callback(docs);



    });
}
var example_user = {
    username:"Dogab123",
    password:"123456",
    full_name:"Doga Budak",
    gender:"Male",
    //MUSTS
    born:"07-11-1991",
    mail:"dogabudak@gmail.com",
    phone:"00905398453099",
    last_seen : {
        where : "istanbul",
        when: "25-10-2016"
    },
    countries:{
        visited:"Turkey, Netherlands, Germany, Israil",
        wants_to:"Bulgaria, Iran, USA"
    },
    nationality:{
        live_city:"Istanbul",
        live_country:"Turkey",
        born_city:"Istanbul",
        born_country:"Turkey"
    },
    photos:"{?:address:?}"
};


var example_user = {
    username:"Burak123",
    password:"654321",
    full_name:"Burak Ince",
    gender:"Male",
    //MUSTS
    born:"07-11-1991",
    mail:"dogasdk@gmail.com",
    phone:"00905adsasda53099",
    last_seen : {
        where : "istanbul",
        when: "25-10-2016"
    },
    countries:{
        visited:"Turkey, Netherlands, Germany, Israil",
        wants_to:"Bulgaria, Iran, USA"
    },
    nationality:{
        live_city:"Istanbul",
        live_country:"Turkey",
        born_city:"Istanbul",
        born_country:"Turkey"
    },
    photos:"{?:address:?}"
}
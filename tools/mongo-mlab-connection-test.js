const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dogabudak:199100@piarkacluster.snpsj.mongodb.net/piarka?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    console.log(err)
    const collection = client.db("piarka").collection("users");
    console.log(collection)
    client.close();
});

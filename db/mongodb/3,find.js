/**
 * Created by gunpower on 2016. 7. 7..
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        //assert.equal(err, null);
        //assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
        callback(docs);
    });
}

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    findDocuments(db, function() {
        db.close();
    });
});
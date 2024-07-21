const { MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

class DB {

    client;
    dbName;

    constructor() {
        this.client = new MongoClient(process.env.DB_URI);
        this.dbName = process.env.DB_NAME;
    }
}

module.exports = DB;
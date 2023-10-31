const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.8qybqfs.mongodb.net/?retryWrites=true&w=majority`;

let client;

const getDB = () => {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    const database = client.db('test');
    const auths = database.collection('auth');
    const posts = database.collection('posts');

    return {
        auths,
        posts
    }
};

module.exports = getDB;
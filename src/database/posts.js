const { ObjectId } = require('mongodb');
const getDB = require('./db');

const getAllPosts = async () => {
    return await getDB().posts.find().sort({ _id: -1 }).toArray();
};

const getPost = async (id) => {
    return await getDB().posts.findOne({ _id: new ObjectId(id) });
};

const createPost = async (post) => {
    const result = await getDB().posts.insertOne(post);
    return { ...post, _id: result.insertedId };
};

module.exports = {
    getAllPosts,
    getPost,
    createPost,
};

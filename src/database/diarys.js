const { ObjectId } = require('mongodb');
const getDB = require('./db');

const getAllDiarys = async () => {
    return await getDB().diarys.find().sort({ _id: -1 }).toArray();
};

const getDiary = async (id) => {
    return await getDB().diarys.findOne({ _id: new ObjectId(id) });
};

const createDiary = async (post) => {
    const result = await getDB().diarys.insertOne(post);
    return { ...post, _id: result.insertedId };
};

module.exports = {
    getAllDiarys,
    getDiary,
    createDiary,
};

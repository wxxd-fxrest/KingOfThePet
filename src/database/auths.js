const getDB = require('./db');

const getAllAuths = async () => {
    return await getDB().auths.find().toArray();
};

const getAuth = async (useremail) => {
    console.log('email', useremail);
    return await getDB().auths.findOne({ useremail: useremail });
};

const createAuth = async (auth) => {
    const result = await getDB().auths.insertOne(auth);
    return { ...auth, _id: result.insertedId };
};

module.exports = {
    getAllAuths,
    getAuth,
    createAuth,
};

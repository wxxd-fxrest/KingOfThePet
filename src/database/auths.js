const getDB = require('./db');

const getAuth = async () => {
    return await getDB().auths.findOne({ ref });
};

const createAuth = async (auth) => {
    const result = await getDB().auths.insertOne(auth);
    return { ...auth, _id: result.insertedId };
};

module.exports = {
    getAuth,
    createAuth,
};
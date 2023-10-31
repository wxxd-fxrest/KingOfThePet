const express = require('express');
const { getAuth, createAuth } = require('../database/auths');
const router = express.Router();

router.get('/:reference', async (req, res) => {
    const auth = await getAuth(req.params.reference);

    if (!auth) {
        res.status(404).send({ status: 'FAILED', error: 'auth not found' });
        return;
    }

    res.send({ status: 'OK', data: auth });
});

router.post('/', async (req, res) => {
    const authData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    authData.ref = ref;

    const newAuth = await createAuth(authData);

    res.status(201).send({ status: 'OK', data: newAuth});
});

module.exports = router;
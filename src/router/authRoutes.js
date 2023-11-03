const express = require('express');
const router = express.Router();
const { getAllAuths, getAuth, createAuth } = require('../database/auths');

router.get('/', async (req, res) => {
    const auth = await getAllAuths();
    res.send({ status: 'OK', data: auth });
});

router.get('/:reference', async (req, res) => {
    try {
        const auth = await getAuth(req.params.reference);

        if (!auth) {
            res.status(404).send({ status: 'FAILED', error: 'Product not found' });
            return;
        }

        res.send({ status: 'OK', data: auth });
    } catch (e) {
        res.status(401).send({ status: 'FAILED', error: e.message });
    }
});

router.post('/', async (req, res) => {
    const authData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    authData.ref = ref;

    const newAuth = await createAuth(authData);

    res.status(201).send({ status: 'OK', data: newAuth });
});

module.exports = router;

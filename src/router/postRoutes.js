const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost } = require('../database/posts');

router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.send({ status: 'OK', data: posts });
});

router.get('/:postID', async (req, res) => {
    try {
        const post = await getPost(req.params.postID);

        if(!post) {
            res.status(404).send({ status: 'FAILED', error: 'post not found' });
            return;
        }

        res.send({ status: 'OK', data: post });
    } catch(e) {
        res.status(401).send({ status: 'FAILED', error: e.message }); 
    }
});

router.post('/', async (req, res) => {
    const postData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    postData.ref = ref;

    const newPost = await createPost(postData);

    res.status(201).send({ status: 'OK', data: newPost});
});


module.exports = router; 
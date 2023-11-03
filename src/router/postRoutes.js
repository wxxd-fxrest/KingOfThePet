const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost } = require('../database/posts');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // uuid 모듈 추가

router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.send({ status: 'OK', data: posts });
});

router.get('/:postID', async (req, res) => {
    try {
        const post = await getPost(req.params.postID);

        if (!post) {
            res.status(404).send({ status: 'FAILED', error: 'post not found' });
            return;
        }

        res.send({ status: 'OK', data: post });
    } catch (e) {
        res.status(401).send({ status: 'FAILED', error: e.message });
    }
});

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
        // console.log(req.rawHeaders);
    } else {
        cb('invalid image file!', false);
    }
};

const uploads = multer({ storage, fileFilter });
// 이미지 url이 같이 업로드되지 않음
router.post('/upload-profile', uploads.single('post_image'), async (req, res) => {
    const postData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    postData.ref = ref;
    const image = req.file;
    console.log('postData', postData);

    const newPost = await createPost({
        image,
        postData,
    });

    res.status(201).send({ status: 'OK', data: newPost });
});

module.exports = router;

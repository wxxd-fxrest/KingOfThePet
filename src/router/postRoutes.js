const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost, getImagePosts } = require('../database/posts');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // uuid 모듈 추가

router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    console.log(posts);
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        // 파일 확장자에 따라 Content-Type 설정
        let contentType;
        if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg')) {
            contentType = 'image/jpeg';
        } else if (file.originalname.endsWith('.png')) {
            contentType = 'image/png';
        } else {
            contentType = 'image'; // 기본 Content-Type
        }

        cb(null, `${Date.now()}${file.originalname}`);

        // Content-Type을 설정
        file.contentType = contentType;
    },
});

const upload = multer({ storage: storage });

// 이미지 url이 같이 업로드되지 않음
router.post('/upload-profile', upload.single('post_image'), async (req, res) => {
    const postData = {
        text: req.body.text,
        QnA: req.body.QnA,
    };

    const ref = (Math.random() + 1).toString(36).substring(7);
    postData.ref = ref;

    const userData = {
        user_id: req.body.user_id,
        useremail: req.body.useremail,
        username: req.body.username,
    };

    const imgData = req.file;

    const newPost = await createPost({
        userData,
        postData,
        imgData,
    });

    res.status(201).send({ status: 'OK', data: newPost });
});

module.exports = router;

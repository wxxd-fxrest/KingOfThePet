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

// const storage = multer.diskStorage({});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//         // console.log(req.rawHeaders);
//     } else {
//         cb('invalid image file!', false);
//     }
// };

// const uploads = multer({ storage, fileFilter });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// 이미지 url이 같이 업로드되지 않음
router.post('/upload-profile', upload.single('post_image'), async (req, res) => {
    console.log(req.file);
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

    const image = {
        img_name: req.body.img_name,
        img_uri: req.body.img_uri,
        img_type: req.body.img_type,
    };

    const imgData = req.file;
    // console.log(imgData);

    const newPost = await createPost({
        userData,
        // image,
        postData,
        imgData,
    });

    res.status(201).send({ status: 'OK', data: newPost });
});

module.exports = router;

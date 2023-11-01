const express = require('express');
const router = express.Router();
const { getAllPosts, getPost, createPost } = require('../database/posts');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // uuid 모듈 추가

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 이미지 저장 폴더 설정
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`; // 고유한 파일 이름 생성
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage: storage });

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

router.post('/', upload.single('new_post_img'), async (req, res) => {
    // 이미지 업로드가 먼저 수행되므로 이미 업로드된 이미지를 사용
    const postData = req.body;
    postData.image = req.file.path; // 이미지 경로를 postData에 추가

    const ref = uuidv4();
    postData.ref = ref;

    const newPost = await createPost(postData);

    res.status(201).send({ status: 'OK', data: newPost });
});

module.exports = router;

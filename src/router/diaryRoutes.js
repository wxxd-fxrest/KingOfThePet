const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // uuid 모듈 추가
const { getAllDiarys, getDiary, createDiary } = require('../database/diarys');

router.get('/', async (req, res) => {
    const posts = await getAllDiarys();
    console.log(posts);
    res.send({ status: 'OK', data: posts });
});

router.get('/:diaryID', async (req, res) => {
    try {
        const post = await getDiary(req.params.diaryID);

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
        cb(null, 'diaryImages');
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
router.post('/upload-diarys', upload.single('diary_image'), async (req, res) => {
    const DiaryData = {
        text: req.body.text,
        QnA: req.body.QnA,
    };

    const ref = (Math.random() + 1).toString(36).substring(7);
    DiaryData.ref = ref;

    const userData = {
        user_id: req.body.user_id,
        useremail: req.body.useremail,
        username: req.body.username,
    };

    const imgData = req.file;

    const newDiary = await createDiary({
        userData,
        DiaryData,
        imgData,
    });

    res.status(201).send({ status: 'OK', data: newDiary });
});

module.exports = router;

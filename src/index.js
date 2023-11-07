const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./router/authRoutes.js');
const postRoutes = require('./router/postRoutes.js');
const diaryRoutes = require('./router/diaryRoutes.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/auths', authRoutes);

app.use('/posts', postRoutes);
app.use(express.static('/upload-posts'));
app.use('/images', express.static('images'));

app.use('/diarys', diaryRoutes);
app.use(express.static('/upload-diarys'));
app.use('/diaryImages', express.static('diaryImages'));

app.get('/', (req, res) => {
    res.send('<h2>Hello world!</h2>');
});
app.get('/posts', (req, res) => {
    res.send('<h2>Hello world!</h2>');
});

app.listen(PORT, () => {
    console.log('API is listening on port ', PORT);
});

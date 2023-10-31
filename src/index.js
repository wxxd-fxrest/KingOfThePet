const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./router/authRoutes.js');
const postRoutes = require('./router/postRoutes.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/auths', authRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send("<h2>Hello world!</h2>");
});

app.listen(PORT, () => {
    console.log('API is listening on port ', PORT);
});

// https://github.com/wxxd-fxrest/KingOfThePet.git
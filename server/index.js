const express = require('express');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json())
app.use(router);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/bid-system');

app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
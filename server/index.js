const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const routes = require('./router');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'theveryverysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/bid-system');

app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
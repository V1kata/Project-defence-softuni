const router = require('express').Router();
const path = require('path');

const userController = require('./controllers/userController');

router.get('/users', userController.getUsers)

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

module.exports = router;
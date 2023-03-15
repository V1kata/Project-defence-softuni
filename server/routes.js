const router = require('express').Router();
const path = require('path');

const userController = require('./controllers/userController');

router.route('/users')
    .get(userController.getUsers)
    .post(userController.addUser);

router.route('/users/:userId')
    .get(userController.getUser);

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

module.exports = router;
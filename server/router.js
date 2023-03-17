const router = require('express').Router();
const path = require('path');

const userController = require('./controllers/userController');
const bidItemController = require('./controllers/bidItemController');

// Users
router.route('/users')
    .get(userController.getUsers)
    .post(userController.addUser);

router.route('/users/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Bid Items
router.route('/bidItems')
    .get(bidItemController.getBidItems)
    .post(bidItemController.addBidItem);

router.route('/bidItems/:bidItemId')
    .get(bidItemController.getBidItem)
    .put(bidItemController.updateBidItem)
    .delete(bidItemController.deleteBidItem);

// All others
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = router;
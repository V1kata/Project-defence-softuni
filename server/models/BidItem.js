const mongoose = require('mongoose');

const bidItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [10, 'Title must be maximum 10 symbols']
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be minimum 1'],
        max: [99999, 'Price must be maximum 99999']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'ImageUrl is not valid!'],
    },
    typeOfPurchase: {
        type: String,
        validate: {
            validator: function (data) {
                return /^(Buy|Sell)$/.test(data);
            },
            message: props => `${props.value} is not a valid fruit color!`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: [100, 'Description must be maximum 100 symbols']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bids: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
});

const BidItem = mongoose.model('bid-items', bidItemSchema);

module.exports = BidItem;
const BidItem = require('../models/BidItem');

exports.getAll = () => BidItem.find();

exports.getBidItemById = (id) => BidItem.findById(id);

exports.createBidItem = (data) => BidItem.create(data);

exports.updateBidItemById = (id, data) => BidItem.findOneAndUpdate({ _id: id }, data, { new: true });

exports.deleteBidItemById = (id) => BidItem.findByIdAndDelete(id);
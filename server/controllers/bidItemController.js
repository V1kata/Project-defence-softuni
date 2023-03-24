const { errorHandler } = require('../utils/errorHandler');
const { getAll, createBidItem, getBidItemById, updateBidItemById, deleteBidItemById } = require("../services/BidItemServise");

exports.getBidItems = async (req, res) => {
    try {
        const data = await getAll();

        res.status(200).json({ bidItem: data });
    } catch(err) {
        errorHandler(err, res, req);
    }
}

exports.addBidItem = async (req, res) => {
    try {
        const data = {...req.body, bids: []}
        const bidItem = await createBidItem(data);

        res.status(200).json({ bidItem });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.getBidItem = async (req, res) => {
    const { bidItemId } = req.params;

    try {
        const bidItem = await getBidItemById(bidItemId).populate('author');

        res.status(200).json({ bidItem })
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.updateBidItem = async (req, res) => {
    const { bidItemId } = req.params;

    try {
        const oldBidItem = await updateBidItemById(bidItemId, req.body);

        res.status(200).json({ bidItem: oldBidItem });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.deleteBidItem = async (req, res) => {
    const { bidItemId } = req.params;

    try {
        const oldBidItem = await deleteBidItemById(bidItemId);

        res.status(200).json({ bidItem: oldBidItem });
    } catch (err) {
        errorHandler(err, res, req);
    }
}
const { errorHandler } = require('../utils/errorHandler');
const authServise = require('../services/authServise');
const { verify } = require('../lib/jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const token = await authServise.register(req.body);
        console.log(token)

        res.status(200).json({ token });
    } catch(err) {
        errorHandler(err, res, req);
    }

}
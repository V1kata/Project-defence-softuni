const { errorHandler } = require('../utils/errorHandler');
const authServise = require('../services/authServise');

exports.registerUser = async (req, res) => {
    try {
        const { token, user } = await authServise.register(req.body);
        const auth = {
            name: user.firstName + " " + user.lastName,
            _id: user._id,
            accessToken: token,
            imageUrl: user.imageUrl,
            phoneNumber: user.phoneNumber
        }

        res.status(200).json({ auth });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.loginUser = async (req, res) => {
    
    try {
        const { token, user } = await authServise.login(req.body);
        const auth = {
            name: user.firstName + " " + user.lastName,
            _id: user._id,
            accessToken: token,
            imageUrl: user.imageUrl,
            phoneNumber: user.phoneNumber
        }

        res.status(200).json({ auth });
    } catch (err) {
        errorHandler(err, res, req);
    }
}
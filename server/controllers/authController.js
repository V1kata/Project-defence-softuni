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

        req.session.userId = auth._id;
        req.session.name = auth.name;

        res.status(200).json({ auth });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await authServise.login(email, password);
        const auth = {
            name: user.firstName + " " + user.lastName,
            _id: user._id,
            accessToken: token,
            imageUrl: user.imageUrl,
            phoneNumber: user.phoneNumber
        }

        req.session.userId = auth._id;
        req.session.name = auth.name;

        res.status(200).json({ auth });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.logoutUser = (req, res) => {
    req.session.userId = null;
    req.session.name = null;
    req.session.destroy();

    res.status(200).json({ session: null })
}
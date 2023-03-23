const { errorHandler } = require('../utils/errorHandler');
const authServise = require('../services/authServise');

exports.registerUser = async (req, res) => {
    try {
        const { token, user } = await authServise.register(req.body);
        const auth = { ...user._doc, accessToken: token, name: user.firstName + " " + user.lastName };
        delete auth.password

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

        const auth = { ...user._doc, accessToken: token, name: user.firstName + " " + user.lastName };
        delete auth.password
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
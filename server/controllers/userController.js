const { errorHandler } = require('../utils/errorHandler');
const { getAll, createUser, getUserById, updateUserById } = require("../services/userServise");

exports.getUsers = async (req, res) => {
    try {
        const data = await getAll();

        res.status(200).json({ user: data });
    } catch(err) {
        errorHandler(err, res, req);
    }
}

exports.addUser = async (req, res) => {
    try {
        const data = {...req.body, posters: []}
        const user = await createUser(data);

        res.status(200).json({ user });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await getUserById(userId);

        res.status(200).json({ user })
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await updateUserById(userId, req.params);

        res.status(200).json({ user })
    } catch (err) {
        errorHandler(err, res, req);
    }
}
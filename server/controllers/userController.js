const { errorHandler } = require('../utils/errorHandler');
const { getAll, createUser, getUserById, updateUserById, deleteUserById } = require("../services/userServise");

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
        const user = await getUserById(userId).populate('posters');
        delete user.password;

        res.status(200).json({ user })
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const oldUser = await updateUserById(userId, req.body);

        res.status(200).json({ user: oldUser });
    } catch (err) {
        errorHandler(err, res, req);
    }
}

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const oldUser = await deleteUserById(userId);

        res.status(200).json({ user: oldUser });
    } catch (err) {
        errorHandler(err, res, req);
    }
}
const User = require('../models/User');

exports.getAll = () => User.find();

exports.getUserById = (id) => User.findById(id);

exports.createUser = (data) => User.create(data);

exports.updateUserById = (id, data) => User.findByIdAndUpdate(id, data);
const User = require('../models/User');

exports.getAll = () => User.find();

exports.getUserById = (id) => User.findById(id);
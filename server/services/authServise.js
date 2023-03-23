const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const secret = 'theveryverysecret';

exports.findByFirstName = (firstName) => User.findOne({ firstName });

exports.findByLastName = (lastName) => User.findOne({ lastName });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async ({ firstName, lastName, email, imageUrl, phoneNumber, password, rePass }) => {
    // Validate passwords
    if (password !== rePass) {
        throw Error('Password missmatch');
    }

    // Check if user exists
    const existingUser = await User.find({
        $or: [
            { email },
            { firstName },
            { lastName }
        ]
    });

    if (existingUser.length) {
        throw new Error('User exists');
    }

    const hashPass = await bcrypt.hash(password, 10);

    await User.create({ firstName, lastName, email, imageUrl, phoneNumber, password: hashPass });

    return this.login(email, password);
}

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
        throw new Error('Invalid email or password');
    }

    const name = user.firstName + " " + user.lastName;
    // Generate token
    // const payload = JSON.stringify({ _id: user._id, email, username: user.username });
    const payload = { _id: user._id, email: user.email, name, imageUrl: user.imageUrl, phoneNumber: user.phoneNumber };
    const token = await jwt.sign(payload, secret);

    return {
        token,
        user
    };
}
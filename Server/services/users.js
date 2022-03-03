const { hash, compare } = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "qwe123verysecretstring123qwe";

const blacklist = [];

async function register(email, password) {
    const existing = await getUserByEmail(email);
    if (existing) {
        throw new Error('Email is taken');
    }
    const hashedPassword = await hash(password, 10);
    const user = new User({
        email,
        hashedPassword
    });
    await user.save();
    return createSession(user);
}

async function login(email, password) {
    const user =  await getUserByEmail(email);
    if (!user) {
        throw new Error('Incorrect email or password');
    }
    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password');
    }
    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}


function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign(
            {
                email: user.email,
                _id: user._id
            },
            JWT_SECRET
        )
    }
}


function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalidated')
    }
    const payload = jwt.verify(token, JWT_SECRET);
    return {
        email: payload.email,
        _id: payload._id,
        token
    };
}


module.exports = {
    register,
    login,
    logout,
    verifySession
}
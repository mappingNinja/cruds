const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { invalidToken, tokenNotFound } = require('../constants/index')

const protect = async (token) => {
    if (!token) {
        return { err: tokenNotFound }
    }

    if (token.startsWith('Bearer')) {
        try {
            token = token.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const userId = await User.findOne({ _id: decode.id }).select('password');
            return userId || { err: 'Login again' };
        }
        catch (err) {
            console.log('error here : ', err)
            return { err: invalidToken }
        }
    } else {
        console.log('error here else : ', err)
        return { err: invalidToken }
    }
}

module.exports = protect;

const generateToken = require('../../../utils/generateToken');
const User = require('../../models/user')

const userLogin = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid Email')
        }
        else if (user && (await user.matchPassword(password))) {
            const { _id, name, email, isAdmin, pic } = (user || {})
            return {
                _id, name, email, isAdmin, pic, token: generateToken(_id)
            }
        } else {
            throw new Error('Invalid Email or Password')
        }
    }
    catch (err) {
        return { err: err.message };
    }
}

module.exports = userLogin
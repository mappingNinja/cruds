const generateToken = require('../../../utils/generateToken');
const User = require('../../models/user')

const userUpdate = async ({ _id, name, password, email, pic, newPassword }) => {

    try {
        const user = await User.findOne({ _id });
        if (!user) {
            throw new Error('Invalid Email')
        }

        else if (user && (await user.matchPassword(password))) {

            const isExistEmail = await User.findOne({ email, _id: { $ne: _id } });
            if (isExistEmail) {
                return { err: 'Email Already Registered' }
            }
            user.name = name || user.name;
            user.email = email || user.email;
            user.pic = pic || user.pic;

            if (newPassword) {
                user.password = newPassword
            }

            const userUpdate = await user.save();
            if (!userUpdate) {
                throw new Error('Something went wrong in update user profile')
            }
            return {
                _id: userUpdate._id,
                name: userUpdate.name,
                email: userUpdate.email,
                isAdmin: userUpdate.isAdmin,
                pic: userUpdate.pic,
                token: generateToken(userUpdate._id)
            }
        } else {
            throw new Error('Invalid user')
        }
    } catch (err) {
        return { err: err.message }
    }
}

module.exports = userUpdate;
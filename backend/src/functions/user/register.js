const generateToken = require('../../../utils/generateToken');
var user = require('../../models/user');

const register = async (name, password, email, file) => {
    try {
        const register = await user.create({ name, password, email, pic: file });
        if (!register) {
            throw new Error('something went Wrong');
        }

        const userData = {
            _id: register?._id,
            name: register?.name,
            email: register?.email,
            isAdmin: register?.isAdmin,
            image: register?.pic,
            token: generateToken(register?._id)
        }

        return userData;
    }
    catch (err) {
        console.log("register error : ", err.message);
        return { err: `${err.message}` }
    }
}
const userRegister = async (name, password, email, file) => {
    try {
        var data = await user.find({ email });
        if (data.length) {
            throw new Error('User Already Exist');
        }
        return await register(name, password, email, file)
    }
    catch (err) {
        console.log('this is the err : ', err)
        return { err: err.message }
    }
}

module.exports = { userRegister, register }
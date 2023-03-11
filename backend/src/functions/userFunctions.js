const generateToken = require('../../utils/generateToken');
var user = require('../model/user');

const userLogin = async (name, password) => {
    try {
        if (!name) {
            return { error: "Name not found " }
        }
        if (!password) {
            return { error: "password not found " }
        }
        var data = await user.find({ name: name, password: password });
        if (!data.length) {
            return { error: "User not found kindly register your self" }
        }

        return data[0];
    }
    catch (error) {
        return { error: error.message }
    }
}

const register = async (name, password, email) => {
    try {
        const register = await user.create({ name, password, email });
        if (!register) {
            throw new Error('something went Wrong');
        }

        const userData = {
            _id: register?._id,
            name: register?.name,
            email: register?.email,
            isAdmin: register?.isAdmin,
            pic: register?.pic,
            token: generateToken(register?._id)
        }

        return userData;
    }
    catch (error) {
        console.log("register error : ", error);
        return { error: `${error.message}` }
    }
}
const userRegister = async (name, password, email) => {
    try {
        if (!name) {
            return { error: "Name not found " }
        }
        if (!password) {
            return { error: "password not found " }
        }
        var data = await user.find({ email });
        if (data.length) {
            throw new Error('User Already Exist');
        }
        return await register(name, password, email)
    }
    catch (error) {
        return { error: error.message }
    }
}


module.exports = { userLogin, userRegister }
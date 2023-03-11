'use strict';
require('dotenv').config();

const { GET, REGISTER, LOGIN, UPDATE, DELETE, CREATE, NOTES, USER, GET_NOTE } = require('../constants/index')
const userLogin = require('../functions/user/login');
const { userRegister } = require('../functions/user/register');
const getNotes = require('../functions/notes/get');
const protect = require('../middlewares/auth');
const createNote = require('../functions/notes/create');
const deleteNote = require('../functions/notes/delete');
const updateNote = require('../functions/notes/update');
const getNote = require('../functions/notes/getNote');
const userUpdate = require('../functions/user/updateProfile');

exports.user = async (req, res) => {
    const { method, submethod } = req.body;
    switch (method) {
        case USER:
            var { name, password, email, file, newPassword } = (req.body || {});
            switch (submethod) {
                case REGISTER:
                    var data = await userRegister(name, password, email, file);
                    res.json(data);
                    break;
                case LOGIN:
                    var data = await userLogin({ email, password });
                    res.json(data);
                    break;
                case UPDATE:
                    const user = await protect(req.headers.authorization);
                    if (user.err) {
                        return res.send(user)
                    }
                    var data = await userUpdate({ _id: user._id, name, password, newPassword, email, pic: file });
                    res.json(data);
                    break;
                default:
                    res.json({ error: "submethod not found" });
                    break;
            }
            break;
        default:
            res.json({ error: "Method not found" });
            break;
    }
};

exports.notes = async (req, res) => {
    const user = await protect(req.headers.authorization);
    if (user.err) {
        return res.send(user)
    }
    const { method, submethod, title, content, category, _id, updateData, search } = req.body;
    if (method !== 'notes') {
        return res.send({ err: 'Invalide method' })
    }
    switch (submethod) {
        case CREATE:
            var data = await createNote({ title, content, category, userId: user._id });
            res.send(data)
            break;
        case GET:
            var data = await getNotes({ userId: user._id, search });
            res.send(data);
            break;
        case UPDATE:
            var data = await updateNote({ userId: user._id, _id, updateData });
            res.send(data);
            break;
        case DELETE:
            var data = await deleteNote({ userId: user._id, _id });
            res.send(data);
            break;
        case GET_NOTE:
            var data = await getNote({ userId: user._id, _id });
            res.send(data);
            break;
        default:
            res.send('submethod not found');
            break;
    }
}
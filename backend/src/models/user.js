const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    isAdmin: { type: Boolean, required: true, default: false },
    pic: { type: String, required: true, default: 'https://google.com' },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel 
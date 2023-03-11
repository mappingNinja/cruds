const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true, ref: "user" }
}, { timestamps: true });

const Notes = mongoose.model('notes', noteSchema, 'notes');

module.exports = Notes;
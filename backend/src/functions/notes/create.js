const Notes = require("../../models/notes");

const createNote = async ({ title, content, category, userId = "mubin" }) => {
    try {
        const insert = await Notes.create({ title, content, category, userId });
        return {insert: true};
    }
    catch (err) {
        return { err: err.message }
    }
}

module.exports = createNote
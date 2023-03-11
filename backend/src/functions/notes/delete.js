const Notes = require("../../models/notes");

const deleteNote = async ({ userId, _id }) => {
    try {
        const query = { userId, _id };
        const note = await Notes.findOne(query);
        if (!note) {
            throw new Error('Note not found');
        }

        const isDeleted = await Notes.deleteOne(query);

        return { deleted: isDeleted?.acknowledged || false };
    }
    catch (err) {
        return { err: err.message }
    }
}

module.exports = deleteNote;
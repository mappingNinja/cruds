const Notes = require("../../models/notes");

const updateNote = async ({ userId, _id, updateData }) => {

    const { title, category, content } = updateData;

    try {
        if (!title) {
            throw new Error('Title not found');
        } else if (!category) {
            throw new Error('Category not found');
        } else if (!content) {
            throw new Error('Content not found');
        }

        const query = { userId, _id }

        const note = await Notes.findOne(query);
        if (!note) {
            throw new Error('Note not found');
        }
        const isUpdate = await Notes.updateOne(query, updateData, { new: true });
        return { isUpdate: isUpdate?.acknowledged || false }
    }
    catch (err) {
        console.log('this is the error : ', err);
        return { err: err.message }
    }
}

module.exports = updateNote
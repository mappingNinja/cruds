const Notes = require('../../models/notes')

const getNote = async ({ userId, _id }) => {
    try {
        if (!userId) {
            throw new Error('userId not found !')
        }

        const note = await Notes.findOne({ userId, _id });
        if (!note) {
            throw new Error('Note not found !')

        }

        return { note };
    }
    catch (err) {
        console.log('get note error : ', err)
        return { err: err.message }
    }
}

module.exports = getNote;
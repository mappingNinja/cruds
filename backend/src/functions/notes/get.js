const Notes = require('../../models/notes')
const getNotes = async ({ userId, search }) => {

    try {
        if (!userId) {
            throw new Error('userId not found !')
        }

        const query = { userId }
        if (search) {
            query.content = { $regex: search }
        }

        const notes = await Notes.find(query).sort({ _id: -1 });
        const counts = await Notes.find(query).countDocuments();
        return { notes, counts };
    }
    catch (err) {
        console.log('get notes error : ', err)
        return { err: err.message }
    }
}

module.exports = getNotes;
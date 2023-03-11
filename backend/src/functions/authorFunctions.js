const db = require('../model/user');

const authorLogin = async (name, password) => {
    try {
        if (!name) return { error: `${error}` }
        if (!password) return { error: `${error}` }

        var data = await db.authorModel.find({ name, password });
        if (!data.length) return { error: "No user found" }
        return data[0].id
    }
    catch (error) {
        console.log("admin login error : ", error);
        return { error: `${error}` }
    }
}

const register = async (name, password) => {
    try {
        var dateTime = new Date().toLocaleDateString();
        var data = await db.authorModel.create({ name, password, dateTime });
        return data.id
    }
    catch (error) {
        console.log("register error : ", error);
        return { error: `${error}` }
    }
}
const authorRegister = async (name, password) => {
    try {
        if (!name) return { error: `${error}` }
        if (!password) return { error: `${error}` }

        var data = await db.authorModel.find({ name, password });
        if (data.length) return { error: "Author already registered" }
        return register(name, password);
    }
    catch (error) {
        console.log("admin register error : ", error);
        return { error: `${error}` }
    }
}

const totalNewsReads = async (id) => {
    var totalNews = await db.newsModel.find({ authorId: id });
    if (!totalNews.length) return 0;

    var count = 0;
    for (var i = 0; i < totalNews.length; i++) {
        count += totalNews[i].totalReads;
    }

    return count;
}

const totalNewsLikes = async (id) => {
    var totalNews = await db.newsModel.find({ authorId: id });
    if (!totalNews.length) return 0;

    var count = 0;
    for (var i = 0; i < totalNews.length; i++) {
        count += totalNews[i].likes;
    }

    return count;
}

const autorDetails = async (id) => {
    try {
        if (!id || !id.length === 24) return { error: "Provide valid user credentials" }

        var userData = await db.authorModel.find({ _id: id });

        var name = userData[0].name;
        var totalDays = (new Date() - new Date(userData[0].dateTime)) / (3600 * 24 * 1000);
        var totalNewsWrites = await db.newsModel.countDocuments({ authorId: id })
        var totalReads = await totalNewsReads(id);
        var totalLikes = await totalNewsLikes(id);
        return { name: name, registerdDays: parseInt(totalDays), totalNewsWritten: totalNewsWrites, totalReads: totalReads, totalLikes: totalLikes }

    }

    catch (error) {
        console.log("AUTHOR Get details error : ", error);
        return { error: `${error}` }
    }
}

const authorGetNews = async (id) => {
    try {
        if (!id || !id.length === 24) return { error: "Provide valid user credentials" }
        var data = await db.newsModel.find({ authorId: id });
        var dataLength = await db.newsModel.countDocuments({ authorId: id });

        if (!data.length) return { newsData: [], newsLength: 0 }
        return { newsData: data, newsLength: dataLength }
    }
    catch (error) {
        console.log("AUTHOR Get News error : ", error);
        return { error: `${error}` }
    }
}


const addAuthorNews = async (title, description, id) => {
    try {
        if (!title) return { error: "Provide valid title" };
        if (!description) return { error: "provide valid description" };
        if (!id || !id.length === 24) return { error: "Provide valid user Id" }

        var author = await db.authorModel.find({ _id: id });
        if (!author.length) return { error: "author not found " }
        var checkExist = await db.newsModel.find({ title });
        if (checkExist.length) return { error: " title Already exist" }
        var dateTime = new Date().toLocaleDateString();
        var insertData = {
            title,
            description,
            author: author[0].name,
            authorId: id,
            dateTime,
        }

        await db.newsModel.create(insertData);
        return { success: true }

    }
    catch (error) {
        console.log("AUTHOR Get News error : ", error);
        return { error: `${error}` }
    }
}


const deleteAuthorNews = async (id) => {
    try {
        if (!id || !id.length === 24) return { error: "Provide valid user credentials" };

        await db.newsModel.findOneAndDelete({ _id: id });
        return { success: true }
    }
    catch (error) {
        console.log("delete news error : ", error)
        return { error: `${error}` }
    }
}

const editAuthorNews = async (id, title, description) => {
    try {
        var query = { _id: id };
        var editData = { title, description };
        await db.newsModel.findOneAndUpdate(query, editData, { new: true });
        return { success: true }
    }
    catch (error) {
        console.log("edit news error : ", error)
        return { error: `${error}` }
    }
}
module.exports = { authorLogin, authorRegister, authorGetNews, autorDetails, addAuthorNews, deleteAuthorNews, editAuthorNews }
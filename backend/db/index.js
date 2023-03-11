const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("DB Connected to : ", connection?.connection?.host);
    } catch (error) {
        console.log("Error : ", error);
        process.exit();
    }
}

module.exports = connectDb;
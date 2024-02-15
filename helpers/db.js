require('dotenv').config()
const mongoose = require("mongoose")

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected Successfully")
    } catch (err) {
        console.log("Couldn't connect to the database")
        process.exit(0)
    }
}

module.exports = connectToDatabase
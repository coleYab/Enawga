const mongoose = require('mongoose');
require('dotenv').config();


async function connectDatabase() {
    const uri = process.env.MONGODB_URI;

    try {
        const connection = await mongoose.connect(uri);
        console.log("Connected to database successfully");
        return connection;
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
    }
}

module.exports = { connectDatabase };

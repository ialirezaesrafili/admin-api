const mongoose = require("mongoose");
require("dotenv").config();

async function databaseConnection() {
    try {
        const mongo_url = process.env.MONGO_URL;
        await mongoose.connect(mongo_url);
        console.log("[MONGODB] Connected!");

    } catch (error) {
        console.log(`[MONGODB] Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    databaseConnection
};
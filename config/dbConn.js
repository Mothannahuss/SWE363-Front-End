const mongoose = require("mongoose");

const connectDBAtlas = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_ATLAS_URI);
    } catch (err) {
        console.error(err);
    }
};

const connectDBLocal = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_COMPASS_URI);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { connectDBAtlas, connectDBLocal };
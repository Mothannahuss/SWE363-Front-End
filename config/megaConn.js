const { Storage } = require("megajs");

const connectCloudStorage = async () => {
    try {
        const storage = await new Storage({
            email: process.env.MEGA_EMAIL,
            password: process.env.MEGA_PASSWORD,
            userAgent: null
        }).ready;
        return storage;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { connectCloudStorage };
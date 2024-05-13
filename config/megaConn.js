const { Storage } = require("megajs");

const connectCloudStorage = async () => {
    try {
        let storage = await new Storage({
            email: process.env.MEGA_EMAIL,
            password: process.env.MEGA_PASSWORD,
            userAgent: null
        }).ready;
        return storage.root.children.find(folder => folder.name.match(process.env.MEGA_FOLDER_NAME));
    } catch (err) {
        console.error(err);
    }
};

module.exports = { connectCloudStorage };
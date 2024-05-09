const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    ownerId: {
        type: mongoose.ObjectId,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        default: undefined
    }
});

module.exports = mongoose.model("Image", imageSchema);
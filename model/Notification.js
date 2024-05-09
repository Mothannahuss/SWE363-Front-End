const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	event: {
        type: mongoose.ObjectId,
        required: true
    },
	user: {
        type: mongoose.ObjectId,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Notification", notificationSchema);
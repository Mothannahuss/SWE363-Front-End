const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Notification", notificationSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
        type: String,
        required: true,
        unique: true
    },
	password: {
        type: String,
        required: true
    },
	is_club: {
        type: Boolean,
        default: false
    },
	join_date: {
        type: Date,
        default: new Date().toISOString()
    },
	interests: {
        type: [String],
        default: []
    },
	following: { // Each club should follow itself ONLY.
        type: [String],
        default: []
    },
	allow_notification: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", userSchema);

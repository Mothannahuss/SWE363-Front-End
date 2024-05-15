const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
	name: {
        type: String,
        required: true,
        unique: true
    },
	user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
	handler: {
        type: String,
        required: true
    },
	avatar: {
        type: String,
        default: ""
    },
	background: {
        type: String,
        default: ""
    },
	bio: {
        type: String,
        default: ""
    },
	about: {
        type: String,
        default: ""
    },
	followers: {
        type: Number,
        default: 0
    },
	events: {
        type: Number,
        default: 0
    },
    categories: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("Club", clubSchema);
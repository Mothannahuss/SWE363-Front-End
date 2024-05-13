const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	club_id: {
        type: Schema.Types.ObjectId,
        ref: "Club",
        required: true
    },
	club_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
	date: {
        type: Strin,
        required: true
    },
	location: {
        type: String,
        required: true
    },
	description: {
        type: String,
        default: ""
    },
	poster: {
        type: String,
        default: ""
    },
	link: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Event", eventSchema);
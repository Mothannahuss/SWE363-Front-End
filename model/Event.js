const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	club_id: {
        type: mongoose.ObjectId,
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
        type: Date,
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
        type: mongoose.ObjectId,
        default: undefined
    },
	link: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Event', eventSchema);
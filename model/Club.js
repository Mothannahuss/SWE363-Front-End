const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
	name: {
        type: String,
        required: true
    },
	user: {
        type: mongoose.ObjectId,
        required: true
    },
	handler: {
        type: String,
        required: true
    },
	avatar: {
        type: mongoose.ObjectId,
        default: undefined
    },
	background: {
        type: mongoose.ObjectId,
        default: undefined
    },
	bio: {
        type: String,
        default: ""
    },
	about: {
        type: String,
        default: ""
    },
	"followers#": {
        type: Number,
        default: 0
    },
	"events#": {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Club', clubSchema);
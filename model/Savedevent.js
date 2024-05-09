const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedEventSchema = new Schema({
	event: {
        type: mongoose.ObjectId,
        required: true
    },
	user: {
        type: mongoose.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("Savedevent", savedEventSchema);
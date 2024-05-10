const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedEventSchema = new Schema({
	event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Savedevent", savedEventSchema);
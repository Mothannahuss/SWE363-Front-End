const express = require("express");
const router = express.Router();
const eventHandler = require("./../models/Event.js");
var mongoose = require('mongoose')

router.get("/:eventId", async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params["eventId"])){
        res.send("This is an invalid link")
        return
    }
    let event = await eventHandler.findById(req.params["eventId"])
    res.render("eventDetails", event)
})


module.exports = router




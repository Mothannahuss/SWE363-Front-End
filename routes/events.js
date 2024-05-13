const express = require("express");
const router = express.Router();
const eventHandler = require("./../models/Event.js");
const clubHandler = require("./../models/Club.js")
var mongoose = require('mongoose')
/**
 * @description a route that gets an eventID from the url, then get the events detalis and render "Eventdetails.njk" using that informations
 * @link domain.com/events/[ID]
 */
router.get("/:eventId", async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params["eventId"])){
        res.send("This is an invalid link")
        return
    }
    let event = await eventHandler.findById(req.params["eventId"])
    let club = await clubHandler.findById(event.club_id)
    console.log(club)
    res.render("eventDetails", {
        event: event,
        club: club
    })
})


module.exports = router

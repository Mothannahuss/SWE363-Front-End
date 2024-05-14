const express = require("express");
const router = express.Router();
const eventHandler = require("../../models/Event.js");
const clubHandler = require("../../models/Club.js")
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
    if(event == null){//event is not found
        res.send("Incorrect event ID")
        return
    }
    let club = await clubHandler.findById(event.club_id)
    let customDate = new Date(event.date)
    customDate.isUpcoming = (customDate > new Date())
    res.render("eventDetails", {
        event: {
            _id: event._id,
            club_id: event.club_id,
            club_name: event.club_name,
            title: event.title,
            date: customDate,
            location: event.location,
            description: event.description,
            poster: event.poster,
            link: event.link,
        },
        club: club
    })
})

router.get("/:eventId/edit", async (req, res) =>{
    if(!mongoose.isValidObjectId(req.params["eventId"])){
        res.send("This is an invalid link")
        return
    }
    let event = await eventHandler.findById(req.params["eventId"])
    if(event == null){//event is not found
        res.send("Incorrect event ID")
        return
    }
    let customDate = new Date(event.date)
    let club = await clubHandler.findById(event.club_id)
    customDate.isUpcoming = (customDate > new Date())
    res.render("editPost", {
        event: {
            _id: event._id,
            club_id: event.club_id,
            club_name: event.club_name,
            title: event.title,
            date: customDate,
            location: event.location,
            description: event.description,
            poster: event.poster,
            link: event.link,
        },
        club: club
    })
})

module.exports = router

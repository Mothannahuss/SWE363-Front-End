const express = require("express");
const router = express.Router();
const eventHandler = require("./../models/Event.js");
const clubHandler = require("./../models/Club.js")
var mongoose = require('mongoose')
/**
 * @description Will take the club handler, get the clubs and assosiated events. Then render 
 * club profile using NJK view engine.
 */
router.get("/:club_handler", async (req, res) =>{
    let clubs = await clubHandler.findOne({handler: {$eq: req.params["club_handler"]}})
    console.log(clubs)
    if(clubs == null){
        res.send("Could not find the club")
        return
    }
    let clubEvents = await eventHandler.find({club_id:{$eq: clubs._id}})
    let events = []
    for(i = 0; i < clubEvents.length; ++i){
        let event = clubEvents.at(i)
        let customDate = new Date(event.date)
        customDate.isUpcoming = (customDate > new Date())
        events.push({
            _id: event._id,
            club_id: event.club_id,
            club_name: event.club_name,
            title: event.title,
            date: customDate,
            location: event.location,
            description: event.description,
            poster: event.poster,
            link: event.link,
        })
    }
    console.log(events)
    res.render("profile", {
        club: clubs,
        events: events
    })
})

router.get("/:club_handler/newpost", async (req, res) =>{
    let clubs = await clubHandler.findOne({handler: {$eq: req.params["club_handler"]}})
    console.log(clubs)
    res.render("newPost", {
        club: clubs
    })
})

router.get("/:club_handler/events", async (req, res) =>{
    let clubs = await clubHandler.findOne({handler: {$eq: req.params["club_handler"]}})
    if(clubs == null){
        res.send("Could not find the club")
        return
    }
    let clubEvents = await eventHandler.find({club_id:{$eq: clubs._id}})
    let events = []
    for(i = 0; i < clubEvents.length; ++i){
        let event = clubEvents.at(i)
        let customDate = new Date(event.date)
        customDate.isUpcoming = (customDate > new Date())
        events.push({
            _id: event._id,
            club_id: event.club_id,
            club_name: event.club_name,
            title: event.title,
            date: customDate,
            location: event.location,
            description: event.description,
            poster: event.poster,
            link: event.link,
        })
    }
    res.send(events)
})



module.exports = router




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
    res.render("profile", {
        club: clubs,
        events: clubEvents
    })
})

router.get("/:club_handler/newpost", async (req, res) =>{
    let clubs = await clubHandler.findOne({handler: {$eq: req.params["club_handler"]}})
    console.log(clubs)
    res.render("newPost", {
        club: clubs
    })
})


module.exports = router




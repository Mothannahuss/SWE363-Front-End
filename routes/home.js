const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');
const User = require("../models/User");
const Event = require("../models/Event");
const Club = require("../models/Club");



router.get("/", async function (req, res) {
    const all_interests = [
        "Debate and Speech",
        "Film and Photography",
        "Gaming",
        "Literature",
        "Religious" ,
        "Sports",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Industrial Engineering",
        "Electrical Engineering",
        "Architecture",
        "Computer",
        "Business",
        "Mathematics",
        "Petroleum Engineering",
        "Visitation" ,
        "Consulting"];

    try{
        let token = req.cookies.jwt;
    let today = new Date();
    let user = await User.findOne({refreshToken: token}).select("-password");
    let followed_clubs = user.following;
    let clubs = await Club.find({name: {$in: followed_clubs}}).select("_id");
    let events = await Event.find({club_id: {$in: clubs}, date: {$gte: today}});
    let all_events = await Event.find({date: {$gte: today}});

    res.render("home.njk", {events: events, allEvents: all_events, user:user.toJSON(), all_interests: all_interests});
    }catch(e){
        console.log(e);
    }
})




module.exports = router;
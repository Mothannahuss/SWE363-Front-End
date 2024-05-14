const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const eventController = require('../controllers/eventController');
const clubController = require('../controllers/clubController');
const User = require("../models/User");
const Event = require("../models/Event");
const Club = require("../models/Club");



router.get("/", async function (req, res) {

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJkYXRlIjoiMjAyNC0wNS0xM1QxNTo1MzoyMC4yMzhaIiwiY2x1YiI6ZmFsc2V9LCJpYXQiOjE3MTU2MTU3ODcsImV4cCI6MTcxNTcwMjE4N30.OMyFxBIyemomRWUHTJPjFDGWv5RRVKZdUUsARKTHKWU";
    let today = new Date();
    let user = await User.findOne({refreshToken: token});
    let followed_clubs = user.following;
    let all_clubs = await Club.find({});
    let categories = await clubController.getAllCategories();

    res.render("browse.njk", {categories: categories,clubs: all_clubs, followed_clubs: followed_clubs});
});


module.exports = router;
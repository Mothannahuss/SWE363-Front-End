const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const eventController = require('../../controllers/eventController');
const clubController = require('../../controllers/clubController');
const User = require("../../models/User");
const Event = require("../../models/Event");
const Club = require("../../models/Club");



router.get("/", async function (req, res) {

    let token = req.cookies.jwt;
    let today = new Date();
    let user = await User.findOne({refreshToken: token});
    let followed_clubs = user.following;
    let all_clubs = await Club.find({});
    let categories = await clubController.getAllCategories();

    res.render("browse.njk", {categories: categories,clubs: all_clubs, followed_clubs: followed_clubs});
});


router.get("/follow", async function(req, res) {
    let club_name = req.query.name;
    let token = req.cookies.jwt;
    let user = await User.findOne({refreshToken: token});
    let club = await Club.findOne({name:club_name});
    club.followers++;
    user.following.push(club_name);
    await user.save();
    await club.save();

    res.redirect("/browse/");
});


router.get("/unfollow", async function(req, res) {
    let club_name = req.query.name;
    let token = req.cookies.jwt;
    let user = await User.findOne({refreshToken: token});
    user.following = user.following.filter(item => item != club_name);
    let club = await Club.findOne({name:club_name});
    club.followers--;
    await user.save();
    await club.save();

    res.redirect("/browse/");
});



module.exports = router;
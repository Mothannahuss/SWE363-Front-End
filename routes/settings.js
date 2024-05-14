const express = require('express');
const router = express.Router({ strict: true });
const User = require("../models/User");
const userController = require("../controllers/userController");



router.get("/", async function(req,res)
{
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
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJkYXRlIjoiMjAyNC0wNS0xM1QxNTo1MzoyMC4yMzhaIiwiY2x1YiI6ZmFsc2V9LCJpYXQiOjE3MTU2MTU3ODcsImV4cCI6MTcxNTcwMjE4N30.OMyFxBIyemomRWUHTJPjFDGWv5RRVKZdUUsARKTHKWU";
    let user = await User.findOne({refreshToken:token}).select("-password");
    
    res.render("settings.njk", {user:user.toJSON(), interests: all_interests});
})

router.post("/", async function(req,res){
    try{
        console.log(req.body);
        await userController.updateSettings(req,res);
        res.redirect("/settings");
    }catch(e)
    {
        console.log(e);
    }
});




module.exports = router;
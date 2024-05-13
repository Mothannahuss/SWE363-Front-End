const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require("../models/User");



router.get("/", async function(req,res)
{
    try{
        let token = req.cookies.jwt;
        console.log(token);
    let userId = await User.findOne({refreshToken: token}).select("_id");
    let eventsNotifications = await userController.getNotifications(userId);

    console.log(eventsNotifications);


    res.render("notification.njk", {notifications: eventsNotifications});
    }catch(e){
        console.log(e);
    }

})


module.exports = router;
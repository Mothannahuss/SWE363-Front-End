const { default: mongoose } = require("mongoose");
const Club = require("../models/Club");
const User = require("../models/User");
const Notification = require("../models/Notification");

const toggleClubFollow = async (req, res) => {
    /*
    The request should contain the user id, club name and toggle state (1 unfollow, 0 follow) in BODY part.
    It return the updated user object.
    */
    if (!req?.body?.userId || !req?.body?.club_name || !req?.body?.toggle) 
        return res.status(400).json({ "message": "User id, club name and toggle state are required." });
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) return res.status(400).json({ "message": "User id is not valid." });

    try {
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(204).json({ "message": "No user found." });
    
        const club = await Club.findOne({ name: req.body.club_name });
        if (!club) return res.status(204).json({ "message": "No club found." });

        if (user.following.some(clp => clp === req.body.club_name)){ // Followd
            if (req.body.toggle === "1") {
                user.following.slice(user.following.indexOf(req.body.club_name), 1);
                club.followers -= 1;
            }
        } else { // not followed
            if (req.body.toggle === "0") {
                user.following.push(req.body.club_name);
                club.followers += 1;
            }
        }
        const result = await user.save();
        const clubUp = await club.save();
        return {success:true}
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const updateSettings = async (req, res) => {
    /*
    The request should contain the whole user object in BODY part.
    It return the updated user object.
    */
   console.log(req.body);
    if (!req?.body?._id || !req?.body?.interests || req?.body?.notification == null || req?.body?.notification == undefined || !req?.body?.email) {
        return res.status(400).json({ "message": "User id, interests, email and notification are required." })};
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
        return res.status(400).json({ "message": "User id is not valid." })};

    try {
        const user = await User.findById(req.body._id);
        if (!user){
             return res.status(204).json({ "message": "No user found." })};
    
        user.email = req.body.email;
        user.interests = req.body.interests;
        user.allow_notification = req.body.notification;
        const result = await user.save();
        return {success: true};
    } catch (err) {
        console.log(err);
        return {success: false};
    }
};


async function getNotifications(userId)
{
    let notifications = await Notification.find({user: userId}, "event read").populate("event");
    let events = [];
    return notifications;
}

module.exports = { toggleClubFollow, updateSettings, getNotifications };
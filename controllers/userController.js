const { default: mongoose } = require("mongoose");
const Club = require("../models/Club");
const User = require("../models/User");
const Notification = require("../models/Notification");

/**
 * The request should contain the user id, club name and toggle state (1 unfollow, 0 follow) in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the updated user object.
 */
const toggleClubFollow = async (req, res) => {
    if (!req?.body?.userId || !req?.body?.club_name || !req?.body?.toggle) 
        return [400, { "message": "User id, club name and toggle state are required." }, null];//res.status(400).json({ "message": "User id, club name and toggle state are required." });
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });

    try {
        const user = await User.findById(req.body.userId);
        if (!user) return [204, { "message": "No user found." }, null];//res.status(204).json({ "message": "No user found." });
    
        const club = await Club.findOne({ name: req.body.club_name });
        if (!club) return [204, { "message": "No club found." }, null];//res.status(204).json({ "message": "No club found." });

        if (user.following.some(clp => clp === req.body.club_name)){ // Followd
            if (req.body.toggle === "1") {
                user.following.splice(user.following.indexOf(req.body.club_name), 1);
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
        return [201, { result, clubUp }, null];//res.json({ result, clubUp });
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

/**
 * The request should contain the whole user object in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the updated user object.
 */
const updateSettings = async (req, res) => {
    if (!req?.body?._id || !req?.body?.interests || !req?.body?.notification || !req?.body?.email) 
        return [400, { "message": "User id, interests, email and notification are required." }, null];//res.status(400).json({ "message": "User id, interests, email and notification are required." });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });

    try {
        const user = await User.findById(req.body._id);
        if (!user) return [204, { "message": "No user found." }, null];//res.status(204).json({ "message": "No user found." });
    
        user.email = req.body.email;
        user.interests = req.body.interests;
        user.notification = req.body.notification;
        const result = await user.save();
        return [201, result, null];//res.json(result);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

module.exports = { toggleClubFollow, updateSettings };
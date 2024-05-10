const { default: mongoose } = require("mongoose");
const Club = require("../model/Club");
const User = require("../model/User");

const toggleClubFollow = async (req, res) => {
    /*
    The request should contain the user id, club name and toggle state (1, 0) in BODY part.
    It return the updated user object.
    */
    if (!req?.body?.userId || !req?.body?.club_name || !req?.body?.toggle) return res.status(400).json({ "message": "User id, club name and toggle state are required." });
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) return res.status(400).json({ "message": "User id is not valid." });

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(204).json({ "message": "No user found." });

    if (toggle) {
        user.following.slice(user.following.indexOf(req.body.club_name), 1);
    } else {
        user.following.push(req.body.club_name);
    }
    const result = await user.save();
    res.json(result);
};

const updateSettings = async (req, res) => {
    /*
    The request should contain the whole user object.
    It return the updated user object.
    */
    if (!req?.body?._id || !req?.body?.interests || !req?.body?.notification || !req?.body?.email) 
        return res.status(400).json({ "message": "User id, interests, email and notification are required." });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return res.status(400).json({ "message": "User id is not valid." });

    const user = await User.findById(req.body._id);
    if (!user) return res.status(204).json({ "message": "No user found." });

    user.email = req.body.email;
    user.interests = req.body.interests;
    user.notification = req.body.notification;
    const result = await user.save();
    res.json(result);
};

module.exports = { toggleClubFollow, updateSettings };
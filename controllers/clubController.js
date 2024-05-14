const { default: mongoose } = require("mongoose");
const Club = require("../models/Club");
const User = require("../models/User");

/**
 * The request should contain the user id in QUERY part. 
 * @param {Request} req 
 * @param {Response} res 
 * @returns all followed clubs.
 */
const getMyClubs = async (req, res) => {
    if (!req?.query?.userId) return [400, { "message": "User id is required." }, null];//res.status(400).json({ "message": "User id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const user = await User.findById(req.query.userId);
        if (!user) return [204, { "message": "No followd clubs found." }, null];//res.status(204).json({ "message": "No followd clubs found." });
    
        const clubs = await Club.find({ name: {"$in": user.following} });
        if (!clubs.length) return [204, { "message": "No clubs found." }, null];//res.status(204).json({ "message": "No clubs found." });
        return [200, clubs, null];//res.json(clubs);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

/**
 * The request should contain the club id in QUERY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the event.
 */
const getClubById = async (req, res) => {
    if (!req?.query?.clubId) return [400, { "message": "Club id is required." }, null];//res.status(400).json({ "message": "Club id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.clubId)) return [400, { "message": "Club id is not valid." }, null];//res.status(400).json({ "message": "Club id is not valid." });

    try {
        const club = await Club.findById(req.query.clubId);
       if (!club) return [204, { "message": "No event found." }, null];//res.status(204).json({ "message": "No event found." });
       return [200, club, null];//res.json(club);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

/**
 * The request should contain the category of the club in QUERY part. 
 * @param {Request} req 
 * @param {Response} res 
 * @returns all clubs for "browse" page. If category is set to null, then all clubs will be returned.
 */
const getClubsByCategory = async (req, res) => { 
    if (!req?.query?.category) return [400, { "message": "category is required." }, null];//res.status(400).json({ "message": "category is required." });

    try {
        const clubs = (req.query.category === "null") ? await Club.find()
                        : await Club.find({ categories: req.query.category });
        if (!clubs.length) return [204, { "message": "No clubs found." }, null];//res.status(204).json({ "message": "No clubs found." });
        return [200, clubs, null];//res.json(clubs);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

/**
 * The request should contain the whole club object in BODY part. It update the handler, bio, about and categories.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the updated club info then user should be redirected to update club page.
 */
const updateClubDetails = async (req, res) => {
    if (!req?.body?.handler || !req?.body?.about || !req?.body?.bio || !req?.body?.categories) 
        return [400, { "message": "Handler, bio, about, club id, and categories are required" }, null];//res.status(400).json({ "message": "Handler, bio, about, club id, and categories are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return [400, { "message": "Club id is not valid." }, null];//res.status(400).json({ "message": "Club id is not valid." });

    try {
        const club = await Club.findById(req.body._id);
        if (!club) return [204, { "message": "No matched club found." }, null];//res.status(204).json({ "message": "No matched club found." });
    
        club.bio = req.body.bio;
        club.about = req.body.about;
        club.handler = req.body.handler;
        club.categories = req.body.categories;
    
        const result = await club.save();
        return [201, result, null];//res.json(result);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);//res.sendStatus(500);
    }
};

module.exports = { getMyClubs, getClubsByCategory, updateClubDetails , getClubById };
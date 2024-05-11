const { default: mongoose } = require("mongoose");
const Club = require("../model/Club");
const User = require("../model/User");

const getMyClubs = async (req, res) => {
    /*
    The request should contain the user id in QUERY part. 
    It return all followed clubs.
    */ 
    if (!req?.query?.userId) return res.status(400).json({ "message": "User id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const followed = await User.findById(req.query.userId);
        if (!followed) return res.status(204).json({ "message": "No followd clubs found." });
    
        const clubs = await Club.find({ name: {"$in": followed} });
        if (!clubs) return res.status(204).json({ "message": "No clubs found." });
        res.json(clubs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const getClubsByCategory = async (req, res) => { 
    /*
    The request should contain the category of the club in QUERY part. 
    It return all clubs for "browse" page. If category is set to null, then all clubs will be returned.
    */ 
    if (!req?.query?.category) return res.status(400).json({ "message": "category is required." });

    try {
        const clubs = (req.query.category) ? await Club.find({ categories: req.query.category }) 
                        : await Club.find();
        if (!clubs) return res.status(204).json({ "message": "No clubs found." });
        res.json(clubs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const updateClubDetails = async (req, res) => {
    /*
    The request should contain the whole club object in BODY part. It update the handler, bio, about and categories.
    It return the updated club info then user should be redirected to update club page.
    */
    if (!req?.body?._id) return res.status(400).json({ "message": "Club id is required." });
    if (!req?.body?.hanlder || !req?.body?.about || !req?.body?.bio || !req?.body?.categories) 
        return res.status(400).json({ "message": "Handler, bio, about, and categories are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return res.status(400).json({ "message": "Club id is not valid." });

    try {
        const club = await Club.findById(req.body._id);
        if (!club) return res.status(204).json({ "message": "No matched club found." });
    
        club.bio = req.body.bio;
        club.about = req.body.about;
        club.handler = req.body.handler;
        club.categories = req.body.categories;
    
        const result = await club.save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

module.exports = { getMyClubs, getClubsByCategory, updateClubDetails };
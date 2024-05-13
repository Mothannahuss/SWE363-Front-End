const { default: mongoose } = require("mongoose");
const Event = require("../model/Event");
const User = require("../model/User");
const Notification = require("../model/Notification");

const getNewNotifications = async (req, res) => {
    /*
    The request should contain the user id and today date (from user region) in QUERY part. 
    It return all events from new notifications.
    */ 
    if (!req?.query?.userId || !req?.query?.today) return res.status(400).json({ "message": "Date and user id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const followed = await User.findById(req.query.userId);
    
        const events = (followed) ? await Event.find({ club_name: {"$in": followed}, date: {"$gte": req.query.today} })
                        : [];
    
        var notifications = await Notification.find({ user: req.query.userId, read: false }).select("event");
        notifications = (notifications) ? notifications : [];
    
        const all = [];
        if (events.length) {
            events.forEach(async (event) => {
                await Notification.create({
                    event: event._id,
                    user: new mongoose.Schema.Types.ObjectId(req.query.userId),
                    read: false
                });
                all.push(event);
            });
        } 
        if (notifications.length) {
            const e = await Event.find({ _id: notifications });
            all.push(e);
        }
        res.json(all);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const getPreviousNotifications = async (req, res) => {
    /*
    The request should contain the user id in QUERY part.
    It return all events from previous notifications.
    */
    if (!req?.query?.userId) return res.status(400).json({ "message": "User id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const notifications = await Notification.find({ user: req.query.userId, read: true }).select("event");
        if (!notifications) return res.status(204).json({ "message": "No previous notification found." });
    
        const events = await Event.find({ _id: notifications });
        if (!events) return res.status(204).json({ "message": "No events found." });
        res.json(events);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const updateNotification = async (req, res) => {
    /*
    The request should contain notification id in BODY part.
    It return the the success then user should be redirected to update notification page.
    */
    if (!req?.body?._id) return res.status(400).json({ "message": "Notification id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return res.status(400).json({ "message": "Notification id is not valid." });

    try {
        const notification = await Notification.findById(req.body._id);
        if (!notification) return res.status(204).json({ "message": "No matched notification found." });
    
        notification.read = true;
    
        const result = await notification.save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

module.exports = { getNewNotifications, getPreviousNotifications, updateNotification };
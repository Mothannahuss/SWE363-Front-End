const { default: mongoose } = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");
const Notification = require("../models/Notification");

const getNewNotifications = async (req, res) => {
    /*
    The request should contain the user id and today date (from user region) in QUERY part. 
    It return all events from new notifications.
    */ 
    if (!req?.query?.userId || !req?.query?.today) return res.status(400).json({ "message": "Date and user id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const user = await User.findById(req.query.userId);
        if (!user) return res.status(204).json({ "message": "User not found." });

        const events = await Event.find({ club_name: {"$in": user.following}, date: {"$gte": req.query.today} });
        const notifications = await Notification.find({ user: req.query.userId, read: false }, { event: 1 });
        const eventsIds = notifications.map((noti) => noti.event);
        const all = await Event.find({ _id: {"$in": eventsIds} });
        if (events.length) {
            for (var event of events) {
                console.log(event)
                if (!eventsIds.some(id => (id.toString() === (event._id).toString()))) {
                    await Notification.create({
                        event: event._id,
                        user: req.query.userId,
                        read: false
                    });
                    all.push(event);
                };
            }
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
        const notifications = await Notification.find({ user: req.query.userId, read: true }, { event: 1 });
        if (!notifications.length) return res.status(204).json({ "message": "No previous notification found." });
    
        const eventsIds = notifications.map((noti) => noti.event);
        const events = await Event.find({ _id: {"$in": eventsIds} });
        if (!events.length) return res.status(204).json({ "message": "No events found." });
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
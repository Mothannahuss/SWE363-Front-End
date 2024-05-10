const { default: mongoose } = require("mongoose");
const Event = require("../model/Event");
const Savedevent = require("../model/Savedevent");
const User = require("../model/User");
const { cloudStorage } = require("../server");
const fs = require("fs");

const getUpcomingAndAllEventsForClubs = async (req, res) => {
    /*
    The request should contain the user id and the date of today (from user region) in QUERY part. 
    It return all upcoming event for "my feed" page. It used also in "profile". If "today" is null, then it return all events.
    */ 
    if (!req?.query?.today || !req?.query?.userId) return res.status(400).json({ "message": "Date and User id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    const clubs = await User.findById(req.query.userId).select("following");
    if (!clubs) return res.status(204).json({ "message": "No followd clubs found." });

    const events = (!req.query.today) ? await Event.find({club_name: {"$in": clubs}, date: {"$gte": req.query.today}})
                    : await Event.find({club_name: {"$in": clubs}});
    if (!events) return res.status(204).json({ "message": "No events found." });
    res.json(events);
};

const getUpcomingEvents = async (req, res) => { 
    /*
    The request should contain the date of today (from user region) in QUERY part. 
    It return all upcoming event for "explore" page.
    */ 
    if (!req?.query?.today) return res.status(400).json({ "message": "Date is required." });

    const events = await Event.find({date: {"$gte": req.query.today}});
    if (!events) return res.status(204).json({ "message": "No upcoming events found." });
    res.json(events);
};

const getUpcomingAndAllSavedEvents = async (req, res) => { 
    /*
    The request should contain the user id and the date of today (from user region) in QUERY part. 
    It return all saved upcoming event for "saved events" page. If "today" is null, then it return all events.
    */ 
    if (!req?.query?.today || !req?.query?.userId) return res.status(400).json({ "message": "Date and User id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return res.status(400).json({ "message": "User id is not valid." });
    
    const eventsIds = await Savedevent.find({user: req.query.userId}).select("event");
    if (!eventsIds) return res.status(204).json({ "message": "No Saved events found." });

    const events = (!req.query.today) ? await Event.find({_id: {"$in": eventsIds}, date: {"$gte": req.query.today}})
                    : await Event.find({_id: {"$in": eventsIds}});
    if (!events) return res.status(204).json({ "message": "No events found." });
    res.json(events);
};

const saveEvent = async (req, res) => {
    /*
    The request should contain the user id and event id in BODY part.
    It return the success then user should be redirected to update saved events page.
    */
    if (!req?.body?.userId || !req?.body?.eventId) return res.status(400).json({ "message": "User and event ids are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) return res.status(400).json({ "message": "User id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.body.eventId)) return res.status(400).json({ "message": "Event id is not valid." });

    try {
        const result = await Savedevent.create({
            user: req.body.userId,
            event: req.body.eventId
        });
        res.json(result);
    } catch (err) {
        console.error(err);
    }
};

const deleteSavedEvent = async (req, res) => {
    /*
    The request should contain the user id and event id in PARAMS part.
    It return the success then user should be redirected to update saved events page.
    */
    if (!req?.params?.userId || !req?.params?.eventId) return res.status(400).json({ "message": "User and event ids are required" });
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) return res.status(400).json({ "message": "User id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) return res.status(400).json({ "message": "Event id is not valid." });

    const savedEvent = await Savedevent.findOne({ user: req.params.userId, event: req.params.eventId }).exec();
    if (!savedEvent) return res.status(204).json({ "message": "No matched saved event found." });
    const result = await savedEvent.deleteOne();
    res.json(result);
};

const createEvent = async (req, res) => {
    /*
    The request should contain the club id, club name, date, location and title in BODY part.
    It return the new event then user should be redirected to update events page.
    */
    if (!req?.body?.club_id || !req?.body?.club_name || !req?.params?.date || !req?.params?.location || !req.body.title) 
        return res.status(400).json({ "message": "Date, title, location, club id and name are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.club_id)) return res.status(400).json({ "message": "Club id is not valid." });

    try {
        const imageUrl = (!req?.file?.path) ? await uploadImageToMega(req.file.path) : "";
        const desc = (!req?.body?.description) ? req.body.description: "";
        const result = await Event.create({
            club_id: req.body.club_id,
            club_name: req.body.club_name,
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            description: desc,
            poster: imageUrl,
            link: req?.body?.link
        });
        res.json(result);
    } catch (err) {
        console.error(err);
    }
};

const updateEvent = async (req, res) => {
    /*
    The request should contain the whole event object in BODY part.
    It return the updated event then user should be redirected to update events page.
    */
    if (!req?.body?._id) return res.status(400).json({ "message": "Event id is required." });
    if (!req?.body?.club_id || !req?.body?.club_name || !req?.params?.date || !req?.params?.location || !req.body.title) 
        return res.status(400).json({ "message": "Date, title, location, club id and name are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.club_id)) return res.status(400).json({ "message": "Club id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return res.status(400).json({ "message": "Event id is not valid." });

    const event = await Event.findById(req.body._id);
    if (!event) return res.status(204).json({ "message": "No matched event found." });

    event.title = req.body.title;
    event.date = req.body.date;
    event.location = req.body.location;
    event.description = (req?.body?.description) ? req.body.description : "";
    event.link = (req?.body?.link) ? req.body.link : "";
    event.poster = (!req?.file?.path) ? await uploadImageToMega(req.file.path) : "";

    const result = await event.save();
    res.json(result);
};

const deleteEvent = async (req, res) => {
    /*
    The request should contain the event id in PARAMS part.
    It return the success then user should be redirected to update events page.
    */
    if (!req?.params?._id) return res.status(400).json({ "message": "Event id is required" });
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) return res.status(400).json({ "message": "Event id is not valid." });

    const event = await Event.findOne({ _id: req.params._id }).exec();
    if (!event) return res.status(204).json({ "message": "No matched event found." });
    const result = await event.deleteOne();
    const poster = (!event.poster) ? await deleteImageFromMega(event.poster) : "";
    res.json(result + poster);
};

const uploadImageToMega = async (filePath) => {
    const file = await cloudStorage.upload(filePath).complete
    .then(file => {
        console.log('File uploaded successfully:', file.name);

        // Cleanup the temporary file after successful upload
        fs.unlink(filePath);
    });
    return file.link();
};

const deleteImageFromMega = async (fileUrl) => {
    const file = cloudStorage.filter(file => file.shareURL.match(fileUrl));
    const del = await file.delete(permanent)
    .then(file => {
        console.log('File deleted successfully:', file.name);
    });
    return del;
};

module.exports = { 
    getUpcomingAndAllEventsForClubs,
    getUpcomingEvents,
    getUpcomingAndAllSavedEvents,
    saveEvent,
    deleteSavedEvent,
    createEvent,
    updateEvent,
    deleteEvent
 };
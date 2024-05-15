const { default: mongoose } = require("mongoose");
const Event = require("../models/Event");
const Savedevent = require("../models/Savedevent");
const User = require("../models/User");
const Club = require("../models/Club");
const { cloudStorage } = require("../server");
const fs = require("fs");

/**
 * The request should contain the user id and the date of today (from user region) in QUERY part. 
 * @param {Request} req 
 * @param {Response} res 
 * @returns all upcoming event for "my feed" page. It used also in "profile". If "today" is null, then it return all events.
 */
const getUpcomingAndAllEventsForClubs = async (req, res) => {
    if (!req?.query?.today || !req?.query?.userId) return [400, { "message": "Date and User id are required." }, null];//res.status(400).json({ "message": "Date and User id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const user = await User.findById(req.query.userId, { _id: 0, following: 1});
        if (!user) return [204, { "message": "No user found." }, null];//res.status(204).json({ "message": "No user found." });

        const events = (req.query.today === "null") ? await Event.find({ club_name: {"$in": user.following} })
                        : await Event.find({ club_name: {"$in": user.following}, date: {"$gte": req.query.today} });
        if (!events.length) return [204, { "message": "No events found." }, null];//res.status(204).json({ "message": "No events found." });
        return [200, events, null];//res.json(events);
    } catch (err) {
        console.log(err);
        return [500, null], null;//res.sendStatus(500);
    }
};

/**
 * The request should contain the date of today (from user region) in QUERY part. 
 * @param {Request} req 
 * @param {Response} res 
 * @returns all upcoming event for "explore" page.
 */
const getUpcomingEvents = async (req, res) => { 
    if (!req?.query?.today) return [400, { "message": "Date is required." }, null];//res.status(400).json({ "message": "Date is required." });

    try {
        const events = await Event.find({ date: {"$gte": req.query.today} });
        if (!events.length) return [204, { "message": "No upcoming events found." }, null];//res.status(204).json({ "message": "No upcoming events found." });
        return [200, events, null];//res.json(events);
    } catch (err) {
        console.log(err);
        retrun [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the user id and the date of today (from user region) in QUERY part. 
 * @param {Request} req 
 * @param {Response} res 
 * @returns all saved upcoming event for "saved events" page. If "today" is null, then it return all events.
 */
const getUpcomingAndAllSavedEvents = async (req, res) => {
    if (!req?.query?.today || !req?.query?.userId) return [400, { "message": "Date and User id are required." }, null];//res.status(400).json({ "message": "Date and User id are required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });
    
    try {
        const eventsIds = await Savedevent.find({ user: req.query.userId }, { event: 1 });
        if (!eventsIds.length) return [204, { "message": "No Saved events found." }, null];//res.status(204).json({ "message": "No Saved events found." });
        const ids = eventsIds.map((event) => event.event);
        const events = (req.query.today === "null") ? await Event.find({ _id: {"$in": ids} })
                        : await Event.find({ _id: {"$in": ids}, date: {"$gte": req.query.today} });
        if (!events.length) return [204, { "message": "No events found." }, null];//res.status(204).json({ "message": "No events found." });
        return [200, events, null];//res.json(events);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the event id in QUERY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the event.
 */
const getEventById = async (req, res) => {
    if (!req?.query?.eventId) return [400, { "message": "Event id is required." }, null];//res.status(400).json({ "message": "Event id is required." });
    if (!mongoose.Types.ObjectId.isValid(req.query.eventId)) return [400, { "message": "Event id is not valid." }, null];//res.status(400).json({ "message": "Event id is not valid." });

    try {
        const event = await Event.findById(req.query.eventId);
       if (!event) return [204, { "message": "No event found." }, null];//res.status(204).json({ "message": "No event found." });
        return [200, event, null];//res.json(event);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the user id and event id in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the success then user should be redirected to update saved events page.
 */
const saveEvent = async (req, res) => {
    if (!req?.body?.userId || !req?.body?.eventId) return [400, { "message": "User and event ids are required" }, null];//res.status(400).json({ "message": "User and event ids are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.body.eventId)) return [400, { "message": "Event id is not valid." }, null];//res.status(400).json({ "message": "Event id is not valid." });

    try {
        const result = await Savedevent.create({
            user: req.body.userId,
            event: req.body.eventId
        });
        return [201, result, null];//res.json(result);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the user id and event id in PARAMS part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the success then user should be redirected to update saved events page.
 */
const deleteSavedEvent = async (req, res) => {
    if (!req?.params?.userId || !req?.params?.eventId) return [400, { "message": "User and event ids are required" }, null];//res.status(400).json({ "message": "User and event ids are required" });
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) return [400, { "message": "User id is not valid." }, null];//res.status(400).json({ "message": "User id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) return [400, { "message": "Event id is not valid." }, null];//res.status(400).json({ "message": "Event id is not valid." });

    try {
        const savedEvent = await Savedevent.findOne({ user: req.params.userId, event: req.params.eventId });
        if (!savedEvent) return [204, { "message": "No matched saved event found." }, null];//res.status(204).json({ "message": "No matched saved event found." });
        const result = await savedEvent.deleteOne();
        return [200, result, null];//res.json(result);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the club id, club name, date, location and title in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the new event then user should be redirected to update events page.
 */
const createEvent = async (req, res) => {
    if (!req?.body?.club_id || !req?.body?.club_name || !req?.body?.club_avatar || !req?.body?.date || !req?.body?.location || !req.body.title) 
        return [400, { "message": "Date, title, location, club id, name and avatar are required" }, null];//res.status(400).json({ "message": "Date, title, location, club id and name are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.club_id)) return [400, { "message": "Club id is not valid." }, null];//res.status(400).json({ "message": "Club id is not valid." });

    try {
        const imageUrl = (req?.file?.path) ? await uploadImageToMega(req.file) : "";
        const desc = (req?.body?.description) ? req.body.description: "";
        const link = (req?.body?.link) ? req.body.link: "";
        const result = await Event.create({
            club_id: req.body.club_id,
            club_name: req.body.club_name,
            club_avatar: req.body.club_avatar,
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            description: desc,
            poster: imageUrl,
            link: link
        });
        const club = await Club.findById(req.body.club_id);
        club.events += 1;
        const clubUp = await club.save();
        return [201, { result, clubUp }, null];//res.json({ result, clubUp });
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the whole event object in BODY part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the updated event then user should be redirected to update events page.
 */
const updateEvent = async (req, res) => {
    if (!req?.body?._id || !req?.body?.club_id || !req?.body?.date || !req?.body?.location || !req.body.title) 
        return [400, { "message": "Date, title, location, event id, club id, name and avatar are required" }, null];//res.status(400).json({ "message": "Date, title, location, event id, club id and name are required" });
    if (!mongoose.Types.ObjectId.isValid(req.body.club_id)) return [400, { "message": "Club id is not valid." }, null];//res.status(400).json({ "message": "Club id is not valid." });
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) return [400, { "message": "Event id is not valid." }, null];//res.status(400).json({ "message": "Event id is not valid." });

    try {
        const event = await Event.findById(req.body._id);
        if (!event) return [204, { "message": "No matched event found." }, null];//res.status(204).json({ "message": "No matched event found." });
    
        event.title = req.body.title;
        event.date = req.body.date;
        event.location = req.body.location;
        event.description = (req?.body?.description) ? req.body.description : "";
        event.link = (req?.body?.link) ? req.body.link : "";
    
        if (!event.poster && req?.file?.path){
            event.poster = await uploadImageToMega(req.file.path);
        } else if (event.poster && req?.file?.path) {
            await deleteImageFromMega(event.poster);
            event.poster = await uploadImageToMega(req.file.path);
        } else if (!event.poster && !req?.file?.path) {
            event.poster = "";
        }
    
        const result = await event.save();
        return [201, result, null];//res.json(result);
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * The request should contain the event id in PARAMS part.
 * @param {Request} req 
 * @param {Response} res 
 * @returns the success then user should be redirected to update events page.
 */
const deleteEvent = async (req, res) => {
    if (!req?.params?.eventId) return [400, { "message": "Event id is required" }, null];//res.status(400).json({ "message": "Event id is required" });
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) return [400, { "message": "Event id is not valid." }, null];//res.status(400).json({ "message": "Event id is not valid." });

    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return [204, { "message": "No matched event found." }, null];//res.status(204).json({ "message": "No matched event found." });
        const result = await event.deleteOne();
        const poster = (event.poster) ? await deleteImageFromMega(event.poster) : "";
        const club = await Club.findById(event.club_id);
        club.events -= 1;
        const clubUp = await club.save();
        return [200, { result, poster, clubUp }, null];//res.json({ result, poster, clubUp });
    } catch (err) {
        console.log(err);
        return [500, null, null];//res.sendStatus(500);
    }
};

/**
 * Upload the file to Mega cloud storage.
 * @param {Multer.file} file 
 * @returns the file share link (url) string.
 */
const uploadImageToMega = async (file) => {
    const folder = await cloudStorage;
    //const data = fs.readFileSync(filePath, 'utf8');
    const fileUploader = await folder.upload({ name: file.originalname, forceHttps: false }, file.path).complete
    .then(f => {
        console.log('File uploaded successfully:', f.name);

        // Cleanup the temporary file after successful upload
        //fs.unlink(filePath); 
    });
    return fileUploader.link();
};

/**
 * Delete a file from Mega cloud storage.
 * @param {String} fileUrl 
 * @returns the state of deletation.
 */
const deleteImageFromMega = async (fileUrl) => {
    const file = (await cloudStorage).filter(file => file.shareURL.match(fileUrl));
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
    getEventById,
    saveEvent,
    deleteSavedEvent,
    createEvent,
    updateEvent,
    deleteEvent
 };
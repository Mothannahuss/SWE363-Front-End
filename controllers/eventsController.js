const { default: mongoose } = require('mongoose');
const Event = require('../model/Event');
const Savedevent = require('../model/Savedevent');
const Image = require('../model/Image');

const getUpcomingEventsForClubs = async (req, res) => { // My Feed & Club's upcoming
    if (!req?.params?.today || !re?.params?.clubs) return res.status(400).json({ 'message': 'Date and Clubs list are required.' });

    const events = await Event.find({club_name: {"$in": req.params.clubs}, date: {"$gte": req.params.today}});
    if (!events) return res.status(204).json({ 'message': 'No upcoming events found.' });
    res.json(events);
};

const getAllEventsForClubs = async (req, res) => { // Club's all
    if (!re?.params?.clubs) return res.status(400).json({ 'message': 'Clubs list is required.' });

    const events = await Event.find({club_name: {"$in": req.params.clubs}});
    if (!events) return res.status(204).json({ 'message': 'No matched events found.' });
    res.json(events);
};

const getUpcomingEvents = async (req, res) => { // Explore
    if (!req?.params?.today) return res.status(400).json({ 'message': 'Date is required.' });

    const events = await Event.find({date: {"$gte": req.params.today}});
    if (!events) return res.status(204).json({ 'message': 'No upcoming events found.' });
    res.json(events);
};

const getUpcomingSavedEvents = async (req, res) => { // Upcoming saved events
    if (!req?.params?.today || !re?.params?.userId) return res.status(400).json({ 'message': 'Date and user\' id are required.' });

    const eventsIds = await Savedevent.find({user: req.params.userId}).select('event');
    const events = await Event.find({_id: {"$in": eventsIds}, date: {"$gte": req.params.today}});
    if (!events) return res.status(204).json({ 'message': 'No upcoming events found.' });
    res.json(events);
};

const getAllSavedEvents = async (req, res) => { // All saved events
    if (!re?.params?.userId) return res.status(400).json({ 'message': 'User\' id is required.' });

    const eventsIds = await Savedevent.find({user: userId}).select('event');
    const events = await Event.find({_id: {"$in": eventsIds}});
    if (!events) return res.status(204).json({ 'message': 'No matched events found.' });
    res.json(events);
};

const saveEvent = async (req, res) => {
    if (!req?.body?.userId || !req?.body?.eventId) {
        return res.status(400).json({ 'message': 'User and event ids are required' });
    }

    try {
        const result = await Savedevent.create({
            user: req.body.userId,
            event: req.body.eventId
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const deleteSavedEvent = async (req, res) => {
    if (!req?.body?.userId || !req?.body?.eventId) {
        return res.status(400).json({ 'message': 'User and event ids are required' });
    }

    const savedEvent = await Savedevent.findOne({ user: req.body.userId, event: req.body.eventId }).exec();
    if (!employee) {
        return res.status(204).json({ "message": 'No matched saved event found.' });
    }
    const result = await savedEvent.deleteOne(); //{ _id: req.body.id }
    res.json(result);
};

const createEvent = async (req, res) => {
    if (!req?.body?.club_id || !req?.body?.club_name || !req?.params?.date || !req?.params?.location) {
        return res.status(400).json({ 'message': 'Date, location, club\'s id and name are required' });
    }

    try {
        const imgID = mongoose.Types.ObjectId();
        const result = await Event.create({
            club_id: req.body.club_id,
            club_name: req.body.club_name,
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            poster: imgID, // TODO
            link: req.body.link
        });

        const data = fs.readFileSync(req.file.path) 
        const img = await Image.create({
            _id: imgID,
            ownerId: result._id,
            img: {
                data: data,
                contentType: 'image/png'
            }
        });

        res.status(201).json(result + img);
    } catch (err) {
        console.error(err);
    }
};

const updateEvent = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const event = await Event.findOne({ _id: req.body._id }).exec();
    if (!event) {
        return res.status(204).json({ "message": `No matched event found.` });
    }

    const data = fs.readFileSync(req.file.path) 

    if (req.body?.title) event.title = req.body.title;
    if (req.body?.date) event.date = req.body.date;
    if (req.body?.location) event.location = req.body.location;
    event.description = req.body.description;
    if (data) {        
        const imgID = mongoose.Types.ObjectId();
        event.poster = imgID;// TODO
        const img = await Image.create({
            _id: imgID,
            ownerId: result._id,
            img: {
                data: data,
                contentType: 'image/png'
            }
        });
        console.log(img);
    }
    event.link = req.body.link;

    const result = await event.save();
    res.json(result);
};

const deleteEvent = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'Event id is required' });
    }

    const event = await Event.findOne({ _id: req.body._id }).exec();
    const img = await Image.findOne({ ownerId: event._id }).exec();
    if (!event) {
        return res.status(204).json({ "message": 'No matched event found.' });
    }
    const result = await event.deleteOne(); //{ _id: req.body.id }
    const result2 = await img.deleteOne();
    res.json(result + result2);
};

module.exports = { 
    getUpcomingEventsForClubs,
    getAllEventsForClubs,
    getUpcomingEvents,
    getUpcomingSavedEvents,
    getAllEventsForClubs,
    getUpcomingEvents,
    getUpcomingSavedEvents,
    getAllSavedEvents,
    saveEvent,
    deleteSavedEvent,
    createEvent,
    updateEvent,
    deleteEvent
 };
const express = require("express");
const router = express.Router();
const path = require("path");
const eventController = require("../controllers/eventController");

router.get("/", async (req, res) => {
    res.render("home");
});

router.get("/myfeed", async (req, res) => {
    let [status, data, cookie] = await eventController.getUpcomingAndAllEventsForClubs(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/explore", async (req, res) => {
    let [status, data, cookie] = await eventController.getUpcomingEvents(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/event", async (req, res) => {
    let [status, data, cookie] = await eventController.getEventById(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.render("eventDetails", {
        event: data
    });
});

module.exports = router;
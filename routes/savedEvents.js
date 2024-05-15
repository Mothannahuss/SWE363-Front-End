const express = require("express");
const router = express.Router();
const path = require("path");
const eventController = require("../controllers/eventController");

router.get("/", async (req, res) => {
    res.render("savedEvent")
});

router.get("/upcoming", async (req, res) => {
    let [status, data, cookie] = await eventController.getUpcomingAndAllSavedEvents(req, null);
    if (status >= 204){
        console.log(data)
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/all", async (req, res) => {
    let [status, data, cookie] = await eventController.getUpcomingAndAllSavedEvents(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.post("/save", async (req, res) => {
    let [status, data, cookie] = await eventController.saveEvent(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.delete("/unsave", async (req, res) => {
    let [status, data, cookie] = await eventController.deleteSavedEvent(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");
const notiController = require("../controllers/notificationController");

router.get("/", async (req, res) => {
    res.render("notification");
});

router.get("/new", async (req, res) => {
    let [status, data, cookie] = await notiController.getNewNotifications(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/previous", async (req, res) => {
    let [status, data, cookie] = await notiController.getPreviousNotifications(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.post("/", async (req, res) => {
    let [status, data, cookie] = await notiController.updateNotification(req, null);
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
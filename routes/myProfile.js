const express = require("express");
const router = express.Router();
const path = require("path");
const clubController = require("../controllers/clubController");
const eventController = require("../controllers/eventController");

router.get("/", async (req, res) => {
    let [status, data, cookie] = await clubController.getClubById(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.render("profile", {
        owner: true,
        club: data,
        isClub: true,
        loadF: "onLoadMyProfile()"
    });
});

router.get("/edit", async (req, res) => {
    let [status, data, cookie] = await clubController.getClubById(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.render("editProfile", {
        club: data
    });
});

router.post("/edit", async (req, res) => {
    let [status, data, cookie] = await clubController.updateClubDetails(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/newPost", async (req, res) => {
    let [status, data, cookie] = await clubController.getClubById(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.render("newPost", {
        club: data
    });
});

router.post("/newPost", async (req, res) => {
    let [status, data, cookie] = await eventController.createEvent(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

router.get("/editPost", async (req, res) => {
    let [status, data, cookie] = await eventController.getEventById(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.render("editPost", {
        event: data
    });
});

router.post("/editPost", async (req, res) => {
    let [status, data, cookie] = await eventController.updateEvent(req, null);
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
const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/userController");

router.post("/", async (req, res) => {
    let [status, data, cookie] = await userController.updateSettings(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log(data);
    res.status(status).json(data);
});

router.post("/follow", async (req, res) => {
    let [status, data, cookie] = await userController.toggleClubFollow(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log(data);
    res.status(status).json(data);
});

module.exports = router;
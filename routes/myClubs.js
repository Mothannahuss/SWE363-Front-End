const express = require("express");
const router = express.Router();
const path = require("path");
const clubController = require("../controllers/clubController");

router.get("/", async (req, res) => {
    res.render("myClubs");
});

router.get("/all", async (req, res) => {
    let [status, data, cookie] = await clubController.getMyClubs(req, null);
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
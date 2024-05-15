const express = require("express");
const router = express.Router();
const path = require("path");
const clubController = require("../controllers/clubController");

router.get("/", async (req, res) => {
    res.render("browse.njk");
});

router.get("/clubs", async (req, res) => {
    let [status, data, cookie] = await clubController.getClubsByCategory(req, null);
    if (status >= 204){
        
        return res.status(status);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log("clubs");
    console.log(data);
    res.status(status).json(data);
});

module.exports = router;
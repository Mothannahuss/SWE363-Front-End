const express = require("express");
const router = express.Router();
const path = require("path");
const clubController = require("../controllers/clubController");

router.get("/", async (req, res) => {
    res.render("myClubs");
});

module.exports = router;
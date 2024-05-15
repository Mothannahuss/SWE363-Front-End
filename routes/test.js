const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const clubHandler = require("../models/Club.js")

router.post("/", userController.toggleClubFollow);
router.get("/:club_handler", async (req, res) =>{
    let clubs = await clubHandler.findOne({handler: {$eq: req.params["club_handler"]}})
    res.render("editprofile", {club: clubs})
})

module.exports = router;
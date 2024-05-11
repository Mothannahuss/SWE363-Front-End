const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getUpcomingEvents);

module.exports = router;
const express = require("express")
const router = express.Router()
const eventController = require("./../../controllers/eventController")

//Return the data of an event with the give id routed to api/events/ with quary eventId="id" i.e. http://localhost:3000/api/events/?eventId=exampleID
router.get("/", eventController.getEventById)

//Create an event when a post request is sent to http://localhost:3000/api/events/ with the correct body
router.post("/", eventController.createEvent)

router.post("/edit", eventController.updateEvent)

router.post("/save", eventController.saveEvent)

module.exports = router
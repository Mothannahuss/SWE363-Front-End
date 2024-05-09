const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");
const { upload } = require("../middleware/multerImage");

router.post("/", upload.single("image"), eventsController.handleNewUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/authController");

router.get("/", logoutController.handleLogout);

module.exports = router;
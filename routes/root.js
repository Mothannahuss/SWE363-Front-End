const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
    if (req.cookies.jwt)
        {
            res.redirect("/home");
        }
    res.sendFile(path.join(__dirname, "..", "login.html"));
});

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "src", "html-toGoToViews", "index.html"));
});

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require("../controllers/authController");

router.get("^/$|/index(.html)?", async (req, res) => {
    res.render("signin");
});

router.post("/login", async (req, res) => {
    let [status, data, cookie] = await authController.handleLogin(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log(data);
    res.json(data);
});

router.post("/register", async (req, res) => {
    let [status, data, cookie] = await authController.handleRegister(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log(data);
    res.json(data);
});

router.post("/forgot", async (req, res) => {
    let [status, data, cookie] = await authController.forgotPassword(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    console.log(data);
    res.json(data);
});

module.exports = router;
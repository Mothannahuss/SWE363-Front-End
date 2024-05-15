const app = require("express");
const userController = require("../controllers/userController");
const router = app.Router();

router.post("/", async (req, res) => {
    let [status, data, cookie] = await userController.toggleClubFollow(req, null);
    if (status >= 204){
        return res.status(status).json(data);
    }
    if (cookie) {
        if (cookie[0] === "clear") res.clearCookie(cookie[1], cookie[2]);
        else res.cookie(cookie[1], cookie[2], cookie[3]);
    }
    res.status(status).json(data);
});

module.exports = router;
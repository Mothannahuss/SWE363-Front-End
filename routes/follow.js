const app = require("express");
const userController = require("../controllers/userController");
const User = require("../models/User");
const router = app.Router();


router.post("/", async function(req,res)
{
    let [status,data,cookie] = await userController.toggleClubFollow(req,res);
    


    if (status === 201)
    {
        let user = await User.findOne({_id: req.body.userId});
        data = user;
    }

    res.status(status).json(data);
});


module.exports = router;
const app = require("express");
const userController = require("../controllers/userController");
const router = app.Router();


router.post("/",async function(req,res)
{
    let response = await userController.toggleClubFollow(req,res);
    console.log(response);

    if (response && response.sucess)
    {
            res.redirect("/browse");
    }


}
)


module.exports = router;
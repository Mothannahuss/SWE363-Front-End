const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const path = require("path");
const cookie = require("cookie-parser");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie());


nunjucks.configure("views", {
  express: app,
});



app.set("view engine", "njk");


// Dummy user data
users = [{ Email: "mothannahuss@gmail.com", password: "1234567890", id: "1" }];


// formatted date object
const date = new Date(); // This gets the current date
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);

// Dummy events data
let events = [
    {title: "Robotics workshop", location: "Bldg 22", club:"Robotics Club", date:formattedDate, time:"5 PM", user_id:"1" },
    {title: "Java workshop", location: "Bldg 22", club:"CS Club", date:formattedDate, time:"8 PM", user_id:"1" },
    {title: "ML workshop", location: "Bldg 22", club:"GDC Club", date:formattedDate, time:"7 PM", user_id:"2" }

]


/**
 * @description default route
 * checks for msg query parameter which represents the error message in the log in process
 * renders singin template in the views folder
 */
app.get("/", function (req, res) {
  let msg = req.query.msg;
  res.render("signin", { msg: msg });
});


/**
 * @description handles post sing in requests
 * uses the data passed from the form to the body and checks if the user is stored in the users array
 * if the user is not found, it then redirects to the default route with error message
 * Otherwise stores the user in a cookie and redirects to the home route
 */
app.post("/signin", function (req, res) {

    let body = req.body;
    let hasAccount = users.find(
        item => item.Email == body.email && item.password == body.password
    );
    console.log(hasAccount);

    if (!hasAccount) {
        let msg = "User not found: please try again";
        res.redirect("/?msg=" + msg);
    }
    else
    {
        let user_id = hasAccount.id;
        res.cookie("user_id", user_id);    
        res.redirect("/home");    
        
    }
});



/**
 * @description the home route renders home template from the views folder
 * it finds the events that belong to the user using the id stored in the cookies
 * it passes the user events and the whole event data to the template
 */
app.get("/home", function(req,res){
    let id = req.cookies.user_id;
    let user_events = events.filter(event => event.user_id == id);

    res.render("home", {events: user_events, allEvents:events});

})

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Listening on port " + PORT);
});

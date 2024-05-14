require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const connectMega = require("./config/megaConn");
const nunjucks = require("nunjucks");
const User = require("./models/User");
const Club = require("./models/Club");
const Event = require("./models/Event");
const Notification = require("./models/Notification");
const bcrypt = require("bcrypt");


const PORT = process.env.PORT || 8001; 

// Connect to MongoDB, if you are not Abdulghani then use "connectDBAtlas" function instead of "connectDBLocal":
// connectDB.connectDBLocal();
connectDB.connectDBAtlas();

const cloudStorage = connectMega.connectCloudStorage();
module.exports = { cloudStorage };

const app = express();

//Inject nunjucks for dynamic pages
nunjucks.configure("views", {
    express: app,
    autoescape: false
});

app.set('view engine', 'njk');

// custom middleware logger
app.use(logger);


// Template engine configuration
nunjucks.configure("views", {
    express: app
  });
  app.set('view engine', 'njk');


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/test", require("./routes/test"));

app.use("/", require("./routes/root"));
app.use("/events", require("./routes/events"));
app.use("/api/events", require("./routes/api/events"));
app.use("/profile", require("./routes/profile.js"))
app.use("/home", require("./routes/home"));
app.use("/browse", require("./routes/browse"));
app.use("/notifications", require("./routes/notifications"));
app.use("/settings", require("./routes/settings"));

app.use(verifyJWT);
//app.use("/employees", require("./routes/api/employees"));
//app.use("/users", require("./routes/api/users"));

app.use(errorHandler);

app.use("*", (req, res) => {
    res.status(404).render("not-found", {
        subtitle: "Not Found",
        owner: req.session.user
    });
});



async function setUp()
{
    let cs = new User({
        email: "cs@kfupm.edu.sa",
        password: await bcrypt.hash("12345678", 10),
        is_club: true,
        interests: ["Coding", "Computer Science"],
        following: ["Computer Club"],
    })

    let vd =  new User({
        email: "vd@kfupm.edu.sa",
        password: await bcrypt.hash("12345678", 10),
        is_club: true,
        interests: ["Video Games"],
        following: ["Video Games Club"],
    });

    await cs.save();
    await vd.save();


    let csClub = new Club({
        name: "Computer Club",
        user: cs._id,
        handler:"@csClub",
        bio:"bla bla",
        about:"bla bla",
        categories: ["Programming"]
    })

    let vdClub = new Club({
        name: "Video Games Club",
        user: vd._id,
        handler:"@vdClub",
        bio:"bla bla",
        about:"bla bla",
        categories: ["gaming"]
    });

    await csClub.save();
    await vdClub.save();

    let csEvent = new Event({
        club_id: csClub._id,
        club_name: csClub.name,
        title: "JS help session",
        date: new Date(),
        location: "Bldg 22-119",
        description: "NodeJS help session",
    })


    let vdEvent = new Event({
        club_id: vdClub._id,
        club_name: vdClub.name,
        title: "FIFA tournament",
        date: new Date(),
        location: "Bldg 22-119",
        description: "EA24 competition",
    });

    await csEvent.save();
    await vdEvent.save();


    let u = new User({
        email: "mothannahuss@gmail.com",
        password: await bcrypt.hash("12345678", 10),
        interests: ["Coding", "biking"],
        following: ["Computer Club"],
        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJkYXRlIjoiMjAyNC0wNS0xM1QxNTo1MzoyMC4yMzhaIiwiY2x1YiI6ZmFsc2V9LCJpYXQiOjE3MTU2MTU3ODcsImV4cCI6MTcxNTcwMjE4N30.OMyFxBIyemomRWUHTJPjFDGWv5RRVKZdUUsARKTHKWU"
    });

    await u.save();

    let n1 = new Notification({
        event: csEvent._id,
        user: u._id,
    })

    await n1.save();
}

try {
    mongoose.connection.once("open", async () => {
        console.log("\tConnected to MongoDB");
        cloudStorage.then(() => {
            console.log("\tConnected to MEGA");
            app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
        });
    });
} catch (err) {
    console.log("Cannot start the server due to: ", err);
}

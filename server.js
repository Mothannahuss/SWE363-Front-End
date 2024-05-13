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
const bcrypt = require("bcrypt");const nunjucks = require("nunjucks");


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
app.use("api/events", require("./routes/api/events"));
app.use("/profile", require("./routes/profile.js"))
app.use("/home", require("./routes/home"));
app.use("/browse", require("./routes/browse"));
app.use("/notifications", require("./routes/notifications"));

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

try {
    mongoose.connection.once("open", () => {
        console.log("\tConnected to MongoDB");
        cloudStorage.then(() => {
            console.log("\tConnected to MEGA");
            app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
        });
    });
} catch (err) {
    console.log("Cannot start the server due to: ", err);
}

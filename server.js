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
module.exports = cloudStorage;

const app = express();

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
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
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



mongoose.connection.once("open", async () => {
    
    console.log("\tConnected to MongoDB");
    cloudStorage.then(() => {
        console.log("\tConnected to MEGA");
        app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
    });
});

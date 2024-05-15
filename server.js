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


const PORT = process.env.PORT || 8001; 

// Connect to MongoDB.
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

app.set("view engine", "njk");

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
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
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/test", require("./routes/test.js"));

app.use("/", require("./routes/root.js"));
app.use("/home", require("./routes/home.js"));
app.use("/club", require("./routes/club.js"));
app.use("/myclubs", require("./routes/myClubs.js"));
app.use("/savedevents", require("./routes/savedEvents.js"));
app.use("/browse", require("./routes/browse.js"));
app.use("/notifications", require("./routes/notifications.js"));
app.use("/follow", require("./routes/follow.js"));
app.use("/myprofile", require("./routes/myProfile.js"));
app.use("/settings", require("./routes/settings.js"));
app.use("/search", require("./routes/search.js"));

//app.use(verifyJWT);
//app.use("/employees", require("./routes/api/employees"));
//app.use("/users", require("./routes/api/users"));

app.use(errorHandler);

app.use("*", (req, res) => {
    res.sendStatus(404);
});

async function indexClubsToMeiliSearch() {
    const items = await Club.find(); // Fetch all items from MongoDB
    const documents = items.map(item => ({
      id: item._id.toString(), // MeiliSearch needs an id field
      // Include other fields you want to index
    }));

    const client = x();
    const index = client.index('clubs'); // 'items' is the index name in MeiliSearch
    await index.addDocuments(documents);
  }

async function search(client)
{
    let query = "Computer";
    let index = client.index("events");
    try {
        const searchResults = await index.search(query);
        console.log(searchResults.hits);
      } catch (err) {
        console.error(err);
      }
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

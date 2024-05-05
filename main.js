/* const express = require("express");
const path = require("path");

const APPPORT = 8001;
const HOST = "127.0.0.1";

const app = express();

app.use(express.static(__dirname));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(APPPORT, () => {
  console.log(`Express server running at http://${HOST}:${APPPORT}/`);
});
 */
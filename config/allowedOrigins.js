const allowedOrigins = [
    "https://gorgeous-chisel-cheshire.glitch.me", //Deployment Site
    "http://127.0.0.1:8001",
    "http://127.0.0.1:3000",
    "http://localhost:27017", //MongoDB
    `http://localhost:${process.env.PORT}` //Server
];

module.exports = allowedOrigins;
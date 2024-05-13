const allowedOrigins = [
    "https://www.yoursite.com", //Deployment Site
    "http://127.0.0.1:8001",
    "http://localhost:27017", //MongoDB
    `http://localhost:${process.env.PORT}` //Server
];

module.exports = allowedOrigins;
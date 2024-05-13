const allowedOrigins = [
    "https://www.yoursite.com", //Deployment Site
    "http://127.0.0.1:27017", //MongoDB
    "http://localhost:27017", 
    `http://127.0.0.1:${process.env.PORT}`, //Server
    `http://localhost:${process.env.PORT}`
];

module.exports = allowedOrigins;
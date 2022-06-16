const express = require('express');
const path = require('path');
const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));


const router = require("./routes/routes.js")

app.use('/', router)

module.exports = app;
var mysql = require('mysql');

require("dotenv").config()

const SQLConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQLPASSWORD,
    database: "groupomania",
    charset: 'utf8mb4'
});

module.exports = SQLConnect
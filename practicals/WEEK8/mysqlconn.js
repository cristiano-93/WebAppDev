// File - mysqlconn.js
const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DBASE
});
    

con.connect( err=> {
    if(err) {
        console.log(err);
        process.exit(1); // exit the server
    } else { 
        console.log('connected to mysql ok');
    }
});

module.exports = con; //export the connection object for use buy the main application 
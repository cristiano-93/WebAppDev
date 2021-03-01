const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'songsdb'
});
con.connect( err=> {
    if(err){
        console.log(`error connecting to mysql: ${err}`);
    } else {
        console.log('connected to mysql ok');
        app.listen(3000);
    }
})
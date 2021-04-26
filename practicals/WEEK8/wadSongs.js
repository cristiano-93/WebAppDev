const express = require('express');
const app = express();
const con = require('./mysqlconn');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
require('dotenv').config();


const userChecking = require('./userChecking');
app.use(`/users` , userChecking);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const songRouter = require('./routes/songs');
app.use('/song', songRouter);






// listen on port 3000
app.listen(3000);


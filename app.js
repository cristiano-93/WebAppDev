const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const con = require('./public/mysqlcon');
require('dotenv').config();
const userRouter = require('./public/routes/users');
const songRouter = require('./public/routes/songs');
const corsMiddleware = require('./public/corsMiddleware');
app.use(corsMiddleware);


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());



app.use('/users', userRouter);
app.use('/songs', songRouter);
app.listen(3000);


app.post('*',(req,res,next)=>{
    console.log('received Post request');
    if(process.env.APP_USER === undefined) {
        // process.env.APP_USER does not exist (it's undefined)
        // Return a 401 (Unauthorized) HTTP code, with a JSON error message
        res.status(401).json({error: "You're not logged in. Go away!"});
    } else {
        next()
    }
})


const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send('Hello World from Express!');
});


app.get('/hello', (req,res)=> {
    res.send('Hello World!');
});


app.get('/time', (req,res)=> {
    res.send(`There have been ${Date.now()} milliseconds since 1/1/70.`);
});
app.listen(3000);
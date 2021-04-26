const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send('Hello World from Express!');
});

// the :artist takes in what the user put in the URL
app.get('/artist/:artist/song/:song', (req,res)=> { 
// the ${req.params.artist} displays what the user put in the URL after the : 
    res.send(`You are searching for ${req.params.song} by ${req.params.artist}` ); 
});


app.listen(3000);
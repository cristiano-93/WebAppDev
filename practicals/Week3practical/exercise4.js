const songs = [
    {
        'id': '1',
        'title': `Say You Won't Let Go`,
        'artist': 'James Arthur',
        'year': `2016`
    },
    {
        'id': '2',
        'title': `I took a pill in Ibiza`,
        'artist': 'Mike Posner',
        'year': `2016`
    },
    {
        'id': '3',
        'title': `Gods plan`,
        'artist': 'Drake',
        'year': `2017`
    },
    {
        'id': '4',
        'title': `Someone you loved`,
        'artist': 'Lewis Capaldi',
        'year': `2019`
    }
];

const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send('Hello World from Express!');
});


app.get('/allSongs', (req,res)=> { 
    res.json(songs); 
});



app.get('/artist/:artist', (req,res)=> { 
    //filtering the artists
    const matchingArtists = songs.filter ( songs => songs.artist.toLowerCase() == req.params.artist );
    res.json(matchingArtists); 
});

app.get('/before/:year', (req,res)=> { 
    const beforeYear = songs.filter ( songs => songs.year.toLowerCase() < req.params.year );
    res.json(beforeYear); 
});
app.get('/after/:year', (req,res)=> { 
    const afterYear = songs.filter ( songs => songs.year.toLowerCase() > req.params.year );
    res.json(afterYear); 
});

app.listen(3000);
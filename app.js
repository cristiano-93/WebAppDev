const http = require("http");

const songs = [
    {
        id: 1,
        artist: "Ariana Grande",
        title: "Brand New You",
        year: 2009
    },
    {
        id: 2,
        artist: "Ariana Grande",
        title: "Give It Up",
        year: 2011
    },
    {
        id: 3,
        artist: "Lady Gaga",
        title: "Poker Face",
        year: 2009
    },
    {
        id: 4,
        artist: "Mark Ronson",
        title: "Uptown Funk",
        year: 2015
    },
    {
        id: 5,
        artist: "The Weeknd",
        title: "Blinding Lights",
        year: 2020
    },
    {
        id: 6,
        artist: "test",
        title: "test",
        year: 2070
    }
]



const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World from Express!')
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});


app.get('/time', (req, res) => {
    res.send(`There have been ${Date.now()} milliseconds since 1/1/70.`);
});

app.get('/allSongs', (req, res) => {
    res.json(songs);
});

app.get('/artist/:name', (req, res) => {
    let name = req.params.name;
    const matchingSongs = songs.filter(artist => artist.artist.toLowerCase() == name);
    res.json(matchingSongs)
});

app.get('/before/:year', (req,res) =>{
    const input = req.params.year;
    const result = songs.filter(song => song.year <= input);
    res.json(result)
});

app.get('/after/:year', (req,res) =>{
    const input = req.params.year;
    const result = songs.filter(song => song.year >= input);
    res.json(result)
});

// app.get('/artist/:name/song/:song', (req, res) => {
//     let name = req.params.name;
//     let song = req.params.song;
//     if (song || name) {
//         res.send(`You are searching for ${song} by ${name}`)
//     }
//     res.send(`You are searching for songs by ${name}`)
// });




app.listen(3000);

// const server = http.createServer(
//     (require, response) => {
//         response.write(`Requested with a method of ${require.method}`);
//         response.end();
//     }
// );
// server.listen(3000);



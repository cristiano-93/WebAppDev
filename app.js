const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());


const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'wadsongs'
});

con.connect(err => {
    if (err) {
        console.log(`Error connecting to mysql: ${err}`);
        process.exit(1); // Quit the Express server with an error code of 1
    } else {
        // Once we have successfully connected to MySQL, we can setup our
        // routes, and start the server.
        console.log('connected to mysql ok');

        // now set up the routes...
        app.get('/songs/:name', (req, res) => {
            // ...
        });

        // listen on port 3000
        app.listen(3000);
    }
});
app.get('/songs/artist/:artist', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=?`,
        [req.params.artist], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});
app.get('/songs/title/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE title=?`,
        [req.params.title], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});
app.get('/songs/artist/:artist/title/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=? AND title=?`,
        [req.params.artist, req.params.title], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

app.get('/songs/id/:id', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE id=?`,
        [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

app.post('/songs/:id/buy', (req, res) => {
    con.query('UPDATE wadsongs SET quantity = quantity-1 WHERE id=?',
        [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else if (results.affectedRows == 1) {
                res.json({ 'message': 'Successfully bought' });
            } else {
                res.status(404).json({ error: 'No rows updated, could not find a record matching that title' });
            }
        });
});
app.delete('songs/:id', (req, res) => {
    con.query('DELETE FROM songs WHERE id=?', [req.params.id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error });
        } else if (results.affectedRows == 1) {
            res.json({ 'message': 'Successfully deleted.' });
        } else {
            res.status(404).json({ error: 'Could not delete: could not find a record matching that ID' });
        }
    });
});
app.post('/songs/create', (req, res) => {
    con.query('INSERT INTO songs(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.likes, req.body.downloads, req.body.reviews, req.body.quantity],
        (error, results, fields) => {
            if(error) {
                res.status(500).json({error: error});
            } else {
                res.json({success: 1});
            } 
        });
});









// app.get('/', (req, res) => {
//     res.send('Hello World from Express!')
// });

// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
// });


// app.get('/time', (req, res) => {
//     res.send(`There have been ${Date.now()} milliseconds since 1/1/70.`);
// });

// app.get('/allSongs', (req, res) => {
//     res.json(songs);
// });

// app.get('/artist/:name', (req, res) => {
//     let name = req.params.name;
//     const matchingSongs = songs.filter(artist => artist.artist.toLowerCase() == name);
//     res.json(matchingSongs)
// });

// app.get('/before/:year', (req, res) => {
//     const input = req.params.year;
//     const result = songs.filter(song => song.year <= input);
//     res.json(result)
// });

// app.get('/after/:year', (req, res) => {
//     const input = req.params.year;
//     const result = songs.filter(song => song.year >= input);
//     res.json(result)
// });

// app.get('/artist/:name/song/:song', (req, res) => {
//     let name = req.params.name;
//     let song = req.params.song;
//     if (song || name) {
//         res.send(`You are searching for ${song} by ${name}`)
//     }
//     res.send(`You are searching for songs by ${name}`)
// });




//app.listen(3000);

// const server = http.createServer(
//     (require, response) => {
//         response.write(`Requested with a method of ${require.method}`);
//         response.end();
//     }
// );
// server.listen(3000);


//week 3 songs
// const songs = [
//     {
//         id: 1,
//         artist: "Ariana Grande",
//         title: "Brand New You",
//         year: 2009
//     },
//     {
//         id: 2,
//         artist: "Ariana Grande",
//         title: "Give It Up",
//         year: 2011
//     },
//     {
//         id: 3,
//         artist: "Lady Gaga",
//         title: "Poker Face",
//         year: 2009
//     },
//     {
//         id: 4,
//         artist: "Mark Ronson",
//         title: "Uptown Funk",
//         year: 2015
//     },
//     {
//         id: 5,
//         artist: "The Weeknd",
//         title: "Blinding Lights",
//         year: 2020
//     },
//     {
//         id: 6,
//         artist: "test",
//         title: "test",
//         year: 2070
//     }
// ]
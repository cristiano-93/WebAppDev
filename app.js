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

app.post('/songs/buy/:id/:quantity', (req, res) => {
    con.query('SELECT quantity FROM wadsongs WHERE id=?',
        [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else if (results.lenght == 1) {
                if (results[0].quantity < 1) {
                    res.status(404).json({ error: 'song is out of stock' });
                }
            }
            else {
                res.json(results);
            }
        });
    con.query('UPDATE wadsongs SET quantity = quantity-? WHERE id=?',
        [req.params.quantity, req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else if (results.affectedRows == 1) {
                con.query('SELECT * FROM wadsongs WHERE id=?',
                    [req.params.id], (error, results, fields) => {
                        if (error) {
                            res.status(500).json({ error: error });
                        } else {
                            res.json(results);
                        }
                    });
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
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json({ success: 1 });
            }
        });
});
app.get('/hometown/:artist', (req, res) => {
    con.query(`SELECT * FROM artists WHERE name=?`,
        [req.params.artist], (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});






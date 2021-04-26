const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mysql'});

con.connect( err=> {
    if(err) {
        console.log(`Error connecting to mysql: ${err}`);
        process.exit(1); // Quit the Express server with an error code of 1
    } else { 
        // Once we have successfully connected to MySQL, we can setup our
        // routes, and start the server.
        console.log('connected to mysql ok');

        // now set up the routes...
        app.get('/artist/:artist', (req, res) => {
            con.query(`SELECT * FROM wadsongs WHERE artist=?`,
                [req.params.artist], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });
        app.get('/title/:title', (req, res) => {
            con.query(`SELECT * FROM wadsongs WHERE title=?`,
                [req.params.title], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });
        app.get('/songs/:title/:artist', (req, res) => {
            con.query(`SELECT * FROM wadsongs WHERE title=? AND artist=?`,
                [req.params.title, req.params.artist], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });        
        
        app.get('/songID/:id', (req, res) => {
            con.query(`SELECT * FROM wadsongs WHERE id=?`,
                [req.params.id], (error,results,fields) => { 
                if(error) {
                    res.status(500).json({ error: error });
                } else {
                    res.json(results);
                }
            });
        });
        app.post('/products/:id/buy', (req, res) => {
            con.query('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?', [req.params.id], (error,results,fields)=> {
                if(error) {
                    res.status(500).json({error: error});
                } else if(results.affectedRows==1) {
                    res.json({'message': 'Successfully bought.'});
                } else {
                    res.status(404).json({error: 'No rows updated, could not find a record matching that ID'});
                }
            } );
        });
        app.delete('/deleteSong/:id', (req, res) => {
            con.query('DELETE FROM wadsongs WHERE id=?', [req.params.id], (error,results,fields)=> {
                if(error) {
                    res.status(500).json({error: error});
                } else if(results.affectedRows==1) {
                    res.json({'message': 'Successfully deleted.'});
                } else {
                    res.status(404).json({error: 'Could not delete: could not find a record matching that ID'});
                }
            } );
        });
        app.post('/newSong/create', (req, res) => {
            con.query('INSERT INTO wadsongs(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.likes, req.body.downloads, req.body.review, req.body.quantity],
                (error, results, fields) => {
                    if(error) {
                        res.status(500).json({error: error});
                    } else 
                        res.json({success: 1});
                    } 
            );
        });

        // listen on port 3000
        app.listen(3000);
    }
});

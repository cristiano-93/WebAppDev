const express = require('express');
const con = require('../mysqlcon');
const songRouter = express.Router();


songRouter.get('/artist/:artist', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=?`,
        [req.params.artist], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});
songRouter.get('/title/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE title=?`,
        [req.params.title], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});
songRouter.get('/artist/:artist/title/:title', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE artist=? AND title=?`,
        [req.params.artist, req.params.title], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

songRouter.get('/id/:id', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE id=?`,
        [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

songRouter.post('/buy/:id/:quantity', (req, res) => {
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
songRouter.delete('/:id', (req, res) => {
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
songRouter.post('/create', (req, res) => {
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


songRouter.get('/hometown/:artist', (req, res) => {
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

module.exports = songRouter;
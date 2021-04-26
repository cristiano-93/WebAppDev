const express = require('express');
const con = require('../mysqlconn');
require('dotenv').config();
const songRouter = express.Router();


// now set up the routes... 
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
songRouter.get('/songs/:title/:artist', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE title=? AND artist=?`,
        [req.params.title, req.params.artist], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

songRouter.get('/songID/:id', (req, res) => {
    con.query(`SELECT * FROM wadsongs WHERE id=?`,
        [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});
songRouter.post('/products/:id/buy', (req, res) => {
    console.log(req.session.username)
    if (req.session.username) {
        const canbuy = con.query('SELECT quantity FROM wadsongs WHERE id=?', [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
                return false;
            } else if (results.length == 1) {
                if (results[0].quantity < 1) {
                    res.status(404).json({ error: 'out of stock. quantity is 0' });
                    return false;

                }
                return true;
            } else {
                res.status(404).json({ error: 'No rows updated, could not find a record matching that ID' });
                return false;
            }
        });
        if (!canbuy) return;
        con.query('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?', [req.params.id], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else if (results.affectedRows == 1) {
                res.json({ 'message': 'Successfully bought.' });
            } else {
                res.status(404).json({ error: 'No rows updated, could not find a record matching that ID' });
            }
        });
    }
    else {
        res.status(401).json({ error: 'please log in' })
    }
});


songRouter.delete('/deleteSong/:id', (req, res) => {
    con.query('DELETE FROM wadsongs WHERE id=?', [req.params.id], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: error });
        } else if (results.affectedRows == 1) {
            res.json({ 'message': 'Successfully deleted.' });
        } else {
            res.status(404).json({ error: 'Could not delete: could not find a record matching that ID' });
        }
    });
});
songRouter.post('/newSong/create', (req, res) => {
    con.query('INSERT INTO wadsongs(title, artist, day, month, year, chart, likes, downloads, review, quantity) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [req.body.title, req.body.artist, req.body.day, req.body.month, req.body.year, req.body.chart, req.body.likes, req.body.downloads, req.body.review, req.body.quantity],
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else
                res.json({ success: 1 });
        }
    );
});

function dotenvMiddleware(req, res, next) {

}


songRouter.get('/hometown/:name', (req, res) => {
    con.query(`SELECT * FROM artists WHERE name=?`,
        [req.params.name], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

module.exports = songRouter;


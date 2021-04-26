const express = require('express');
const con = require('../mysqlconn');
const userRouter = express.Router();

userRouter.get('/allUsers', (req,res)=> {
    con.query(`SELECT * FROM ht_users`, [], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

userRouter.get('/user/:username', (req,res)=> {
    con.query(`SELECT * FROM ht_users WHERE username=?`,
        [req.params.username], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                res.json(results);
            }
        });
});

module.exports = userRouter; // export the module for external use
const express = require('express');
const app = express();
const con = require('./mysqlconn');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
require('dotenv').config();


// const userChecking = require('./userChecking');
// app.use(`/users`, userChecking);


const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({}, con.promise());


app.use(expressSession({
    store: sessionStore,
    secret: 'BinnieAndClyde',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));




// Login route
app.post('/login', (req, res) => {
    con.query(`SELECT * FROM ht_users WHERE username= ? AND password = ?`,
        [req.body.username, req.body.password], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error })
                console.log(error)
            } else {
                console.log(results)
                if (results.length == 1) {
                    req.session.username = req.body.username;
                    res.json({ "username": req.body.username })
                } else { res.status(401).json({ error: "incorrect login!" }) }
            }
        })
});

// Logout route
app.get('/logout', (req, res) => {
    req.session = null;
    res.status(200).json({ 'success': 1 });
});

// 'GET' login route - useful for clients to obtain currently logged in user
app.get('/login', (req, res) => {
    res.status(200).json({ username: req.session.username || null });
});

// Middleware which protects any routes using POST or DELETE from access by users who are are not logged in
app.use((req, res, next) => {
    if (["POST", "DELETE"].indexOf(req.method) == -1) {
        next();
    } else {
        if (req.session.username) {
            next();
        } else {
            res.status(401).json({ error: "You're not logged in. Go away!" });
        }
    }
});


const userRouter = require('./routes/users');
app.use('/users', userRouter);

const songRouter = require('./routes/songs');
app.use('/song', songRouter);



// listen on port 3000
app.listen(3000);


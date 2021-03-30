const http = require("http");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);

const con = require('./public/mysqlcon');
const sessionStore = new MySQLStore({}, con.promise());

require('dotenv').config();
const userRouter = require('./public/routes/users');
const songRouter = require('./public/routes/songs');
const corsMiddleware = require('./public/corsMiddleware');
app.use(corsMiddleware);


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());






app.use(expressSession({
    // Specify the session store to be used.
    store: sessionStore,

    // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex) in a real application.
    secret: 'BinnieAndClyde',

    // use as recommended by your chosen session store - related to internals of how session stores work
    resave: false,

    // save session to store before modification
    saveUninitialized: false,

    // reset cookie for every HTTP response. The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response. 
    // Thus, the session cookie will expire after 10 mins of *inactivity* (no HTTP request made and consequently no response sent) when 'rolling' is true.
    // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was interacting with the site, which would be very
    // annoying - so true is the sensible setting.
    rolling: true,

    // destroy session (remove it from the data store) when it is set to null, deleted etc
    unset: 'destroy',

    // useful if using a proxy to access your server, as you will probably be doing in a production environment: this allows the session cookie to pass through the proxy
    proxy: true,

    // properties of session cookie
    cookie: {
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));

// Login route
app.post('/login', (req, res) => {
    console.log(req.body)
    con.query(`SELECT * FROM ht_users WHERE username=? AND password=?`,
        [req.body.username, req.body.password], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
                console.log(error)
            } else {
                console.log(results)
                console.log(req.body.username)
                console.log(req.body.password)
                if (results.length == 1) {
                    req.session.username = req.body.username;
                    res.json({ "username": req.body.username });
                    

                } else {
                    res.status(401).json({ error: "Incorrect login Info!" });
                }
            }
        });
});

// Logout route
app.post('/logout', (req, res) => {
    req.session = null;
    res.json({ 'success': 1 });
});

// 'GET' login route - useful for clients to obtain currently logged in user
app.get('/login', (req, res) => {
    res.json({ username: req.session.username || null });
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

app.use('/users', userRouter);
app.use('/songs', songRouter);
app.listen(3000);
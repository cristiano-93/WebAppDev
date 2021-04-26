const con = require('./mysqlconn');

function userChecking(req,res, next) {
    if (process.env.APP_USER === undefined) {
        res.status(401).json({ error: "You're not logged in. Go away!" });
    } else {
        con.query(`SELECT * FROM ht_users WHERE username=? AND isadmin=1 `, [process.env.APP_USER], (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
                if (results.length == 1){
                    next()
                }
                else{
                    res.status(401).json({ error: "You're not a admin in. Go away!" });
                }
            }
        });
    }
    
};

module.exports = userChecking; // export the module for external use
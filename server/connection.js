const mySQL = require('mysql2');

const db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "$Hsa31230",
    database: "air_ticket_res_db",
    port: 3306
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database!")
});

module.exports = db;  
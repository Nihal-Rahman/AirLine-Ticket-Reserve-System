const mySQL = require('mysql2');

const db = mySQL.createConnection({
    host: "localhost",
    user:"root",
    password: null,
    database:"tutorial"
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Connected to database!")
});

module.exports = db;
const mySQL = require('mysql2');

const db = mySQL.createConnection({
    host: "localhost",
    user:"root",
    password:"whatever password you set in mysql workbench or anything like that",
    database:"whatever the name of your db is"
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Connected to database!")
});

module.exports = db;
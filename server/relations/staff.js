const db = require('path to connection.js file from your computer');


module.exports = class Staff {
    constructor(newStaff) {
        this.email = newStaff.email;
        this.firstName = newStaff.first;
        this.lastName = newStaff.last;
        this.password = newStaff.pass;
        this.username = newStaff.username;
        this.dob = newStaff.dob;
        this.airline = newStaff.airline;
    }

    getInfo() {
        console.log(this.email, this.firstName, this.lastName);
    }

    insert() {
        const sql = "INSERT INTO Staff VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        var values = [this.email,
        this.firstName,
        this.lastName,
        this.password,
        this.username,
        this.dob,
        this.airline];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success");
        })
    }
}
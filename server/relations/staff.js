const db = require('../connection');

module.exports = class Staff {
    constructor(newStaff){
        if (newStaff != null) {
            this.userName = newStaff.userName;
            this.passcode = newStaff.passcode;
            this.first_name = newStaff.first_name;
            this.last_name = newStaff.last_name;
            this.date_of_birth = newStaff.date_of_birth;
            this.airline_name = newStaff.airline_name;
        }
    }

    getInfo() {
        console.log(this.userName, this.passcode);
    }

    insert() {
        const sql = "INSERT INTO Airline_Staff VALUES (?,?,?,?,?,?);";
        var values = [this.userName, this.passcode, this.first_name, this.last_name, this.date_of_birth, this.airline_name];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success!");
        })
    }

    async getfromDB(user, pass) {
        const sql = "SELECT userName, passcode FROM Airline_Staff WHERE userName = ? AND passcode = ?;"
        const userThere = await db.promise().query(sql, [user, pass], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Found user!")
        });

        const result = userThere[0][0];
        if (result == null) {
            return false;
        }
        if (result != null) {
            return true;
        } 
    }
}
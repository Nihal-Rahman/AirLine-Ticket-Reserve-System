const db = require('../connection');

module.exports = class Staff {
    constructor(newStaff){
        if (newStaff != null) {
            this.userName = newStaff.username;
            this.passcode = newStaff.password;
            this.first_name = newStaff.firstName;
            this.last_name = newStaff.lastName;
            this.date_of_birth = newStaff.dob;
            this.airline_name = newStaff.airline;
            this.email = newStaff.email;
            this.phoneNum = newStaff.phoneNum;
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
        });


         const sql1 = "INSERT INTO staff_email_address VALUES (?,?);";
         values = [this.userName, this.email];

         db.query(sql1, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success!");
        });

        const sql2 = "INSERT INTO staff_phone_number VALUES (?,?);";
         values = [this.userName, this.phoneNum];

         db.query(sql2, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success!");
        });



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
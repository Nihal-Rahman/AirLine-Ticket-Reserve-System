const db = require('../connection');
const bcrypt = require("bcrypt");


module.exports = class Customer {
    constructor(newCustomer) {
        if (newCustomer != null) {
            this.email = newCustomer.email;
            this.firstName = newCustomer.first;
            this.lastName = newCustomer.last;
            this.password = newCustomer.pass;
            this.buildingNum = newCustomer.buildnum;
            this.street = newCustomer.street;
            this.apt = newCustomer.apt;
            this.city = newCustomer.city;
            this.state = newCustomer.state;
            this.zipCode = newCustomer.zip;
            this.passNum = newCustomer.passnum;
            this.passCountry = newCustomer.passcountry;
            this.passExpiration = newCustomer.passexpire;
            this.dob = newCustomer.dob;
        }
    }

    getInfo() {
        console.log(this.email, this.firstName, this.lastName);
    }

    insert() {
        const sql = "INSERT INTO Customer VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        var values = [this.email, this.firstName, this.lastName, this.dob, this.password, this.buildingNum, this.street, this.apt, this.city, this.state, this.zipCode, this.passNum, this.passCountry, this.passExpiration];



        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success");
        });

    }

    async getfromDB(user, pass) {
        const sql = "SELECT email_address, passcode FROM Customer WHERE email_address = ? ;"
        const userThere = await db.promise().query(sql, [user], (err, result) => {
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
            bcrypt.compare(pass, result.passcode).then((match) => {
                if (!match) {
                    return false; 
             }
                else {
                    console.log("Login successful");
                    return true;
                }
            });
        } 
    }

    async getFlightsFromDB(email){
        //const sql = "SELECT * FROM FLIGHT WHERE flight_num in (SELECT flight_num FROM DBProject.Ticket NATURAL JOIN DBProject.Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE < DEPARTURE_DATE OR (CURRENT_DATE = departure_date AND CURRENT_TIME < departure_time)));";
        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM DBProject.Ticket NATURAL JOIN DBProject.Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE < DEPARTURE_DATE OR (CURRENT_DATE = departure_date AND CURRENT_TIME < departure_time));"
        const flightInfo = await db.promise().query(sql, [email], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }

            console.log("Found all flight info!");
        });
        
        return flightInfo[0];
    }
}
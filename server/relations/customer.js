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

    async getFlightsFromDB(email){
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

    async flightsToCancel(email){
        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM DBProject.Ticket NATURAL JOIN DBProject.Ticket_Bought_By WHERE email_address = ? AND (departure_date > CURRENT_DATE) AND (departure_time > CURRENT_TIME);"
        const flightInfo = await db.promise().query(sql, [email], (err, result)=>{
            if(err){
                console.log(values);
                throw err;
            }

            console.log("Found flight info");
        })

        return flightInfo[0];
    }

    async searchFlights(departure, arrival, date){
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";

        const ticketInfo = await db.promise().query(sql, [departure, arrival, date], (err, result) => {
            if(err){
                console.log(values);
                throw err;
            }
        })

        return ticketInfo[0];
    }

    payForTickets(info, email){
        const ticketInsert = info.map((data, key)=>{
            return {ticket_ID: data.ticket_ID,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dob: data.dob,
                    card_type: data.card_type,
                    card_num: data.card_num,
                    name_on_card: data.name_on_card,
                    expiration_date: data.expiration_date,
                    email: email
                }
        });

        const sql = "INSERT INTO Ticket_Bought_By VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_TIME);"
        ticketInsert.forEach((data)=>{
            db.query(sql, [data.ticket_ID, data.email, data.firstName, data.lastName, data.dob, data.card_type, data.card_num, data.name_on_card, data.expiration_date, ])
        })
    }

    cancel(ticket_ID){
        const sql = "DELETE FROM Ticket_Bought_By WHERE ticket_id = ?"

        db.query(sql, [ticket_ID], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Delete Success");
        })
    }


    async getTodaysFlights(email){
        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM DBProject.Ticket NATURAL JOIN DBProject.Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE = DEPARTURE_DATE);"

        const flightInfo = db.query(sql, [email], (err, result) =>{
            if(err){
                console.log(values);
                throw err;
            }
        })

        console.log(flightInfo[0]);
        return flightInfo[0];
    }
}
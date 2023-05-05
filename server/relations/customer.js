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

        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name, flight_status FROM ticket_bought_by natural join ticket natural join flight WHERE email_address = ? AND (CURRENT_DATE < DEPARTURE_DATE OR (CURRENT_DATE = departure_date AND CURRENT_TIME < departure_time));"
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
        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM Ticket NATURAL JOIN Ticket_Bought_By WHERE email_address = ? AND (departure_date > CURRENT_DATE) AND (departure_time > CURRENT_TIME);"
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

    insertNewReview(values) {
        const sql = "INSERT INTO Review VALUES (?,?,?,?,?,?);";


        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success");
        });

    }

    async getCustomerReviews(email){
        const sql = "SELECT flight_num, rating, comments FROM Review WHERE email_address = ?;";
        const listOfReviews = await db.promise().query(sql, [email], (err, result) => {
            if (err) {
                console.log(email);
                throw err;
            }
            console.log("Found all customer review info!");
        });

        
        return listOfReviews[0];
    }


    async getTodaysFlights(email){
        const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM Ticket NATURAL JOIN Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE = DEPARTURE_DATE);"

        const flightInfo = db.query(sql, [email], (err, result) =>{
            if(err){
                console.log(values);
                throw err;
            }
        })

        console.log(flightInfo[0]);
        return flightInfo[0];
    }

    async getSixMonthSpending(email) {
        // const customerSixMonthPurchasesQuery = "SELECT email_address, round(t.price * (1 + 0.25*(COUNT(all(t.ticket_id)) / airplane.num_of_seats >= 0.8)), 2) as market_price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats as total_capacity, COUNT(all(tbb.ticket_id)) as num_of_tickets_sold FROM flight JOIN airplane ON flight.airplane_id = airplane.airplane_id JOIN ticket as t ON t.flight_num = flight.flight_num JOIN ticket_bought_by as tbb on t.ticket_id = tbb.ticket_ID WHERE email_address = ? AND tbb.purchase_date BETWEEN DATE_SUB(current_date(), INTERVAL 6 MONTH) AND current_date() GROUP BY t.price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats;"
        const customerSixMonthPurchasesQuery = "SELECT email_address, round(t.price * (1 + 0.25*(COUNT(all(t.ticket_id)) / airplane.num_of_seats >= 0.8)), 2) as market_price, tbb.purchase_date, MONTH(tbb.purchase_date) as purchase_month, YEAR(tbb.purchase_date) as purchase_year FROM flight JOIN airplane ON flight.airplane_id = airplane.airplane_id JOIN ticket as t ON t.flight_num = flight.flight_num JOIN ticket_bought_by as tbb on t.ticket_id = tbb.ticket_ID  WHERE email_address = ? AND tbb.purchase_date BETWEEN DATE_SUB(current_date(), INTERVAL 6 MONTH) AND current_date() GROUP BY t.price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats;"

        const customerSixMonthlyPurchases = await db.promise().query(customerSixMonthPurchasesQuery, [email], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log("Found all the flight purchases a customer has made");
            }
        });

        //first need to initialize the dictionary with the keys and initial value of 0
        let monthlySums = {};
        const ind2MonthMap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" }
        for (let ind = 0; ind < customerSixMonthlyPurchases.length; ind++) {
            for (let ind2 = 0; ind2 < customerSixMonthlyPurchases[ind].length; ind2++) {
                const flight_purchase_info = customerSixMonthlyPurchases[ind][ind2];
                if (flight_purchase_info.market_price != null) {
                    const purchaseMonth = Number(flight_purchase_info.purchase_month);
                    const purchaseDate = ind2MonthMap[purchaseMonth].concat(" ", flight_purchase_info.purchase_year.toString());
                    monthlySums[purchaseDate] = 0;
                }
            }
        }

        //const ind2MonthMap = {1: "Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sept", 10: "Oct", 11:"Nov", 12:"Dec"}
        for (let ind = 0; ind < customerSixMonthlyPurchases.length; ind++) {
            for (let ind2 = 0; ind2 < customerSixMonthlyPurchases[ind].length; ind2++) {
                const flight_purchase_info = customerSixMonthlyPurchases[ind][ind2];
                if (flight_purchase_info.market_price != null) {
                    const purchaseMonth = Number(flight_purchase_info.purchase_month);
                    const purchaseDate = ind2MonthMap[purchaseMonth].concat(" ", flight_purchase_info.purchase_year.toString());
                    monthlySums[purchaseDate] = (Math.round((monthlySums[purchaseDate] + Number(flight_purchase_info.market_price)) * 100) / 100);
                }
            }
        }

        for (let date in monthlySums) {
            monthlySums[date] = monthlySums[date].toString();
        }

        return monthlySums;
    }


    async getSpendingOverRange(email, start, end) {
        const customerMonthlyPurchasesOverRangeQuery = "SELECT email_address, round(t.price * (1 + 0.25*(COUNT(all(t.ticket_id)) / airplane.num_of_seats >= 0.8)), 2) as market_price, tbb.purchase_date, MONTH(tbb.purchase_date) as purchase_month, YEAR(tbb.purchase_date) as purchase_year FROM flight JOIN airplane ON flight.airplane_id = airplane.airplane_id JOIN ticket as t ON t.flight_num = flight.flight_num JOIN ticket_bought_by as tbb on t.ticket_id = tbb.ticket_ID  WHERE email_address = ? AND tbb.purchase_date BETWEEN ? AND ? GROUP BY t.price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats;"

        const customerMonthlyPurchases = await db.promise().query(customerMonthlyPurchasesOverRangeQuery, [email, start, end], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log("Found all the flight purchases a customer has made");
            }
        });

        //first need to initialize the dictionary with the keys and initial value of 0
        let monthlySums = {};
        const ind2MonthMap = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" }
        for (let ind = 0; ind < customerMonthlyPurchases.length; ind++) {
            for (let ind2 = 0; ind2 < customerMonthlyPurchases[ind].length; ind2++) {
                const flight_purchase_info = customerMonthlyPurchases[ind][ind2];
                if (flight_purchase_info.market_price != null) {
                    const purchaseMonth = Number(flight_purchase_info.purchase_month);
                    const purchaseDate = ind2MonthMap[purchaseMonth].concat(" ", flight_purchase_info.purchase_year.toString());
                    monthlySums[purchaseDate] = 0; 
                }
            }
        }

        //const ind2MonthMap = {1: "Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sept", 10: "Oct", 11:"Nov", 12:"Dec"}
        for (let ind = 0; ind < customerMonthlyPurchases.length; ind++) {
            for (let ind2 = 0; ind2 < customerMonthlyPurchases[ind].length; ind2++) {
                const flight_purchase_info = customerMonthlyPurchases[ind][ind2];
                if (flight_purchase_info.market_price != null) {
                    const purchaseMonth = Number(flight_purchase_info.purchase_month);
                    const purchaseDate = ind2MonthMap[purchaseMonth].concat(" ", flight_purchase_info.purchase_year.toString());
                    monthlySums[purchaseDate] = (Math.round((monthlySums[purchaseDate] + Number(flight_purchase_info.market_price)) * 100) / 100);
                }
            }
        }

        for (let date in monthlySums) {
            monthlySums[date] = monthlySums[date].toString();
        }

        return monthlySums;
    }

    async getYearlyTotal(email) {
        const customerYearPurchasesQuery = "SELECT email_address, round(t.price * (1 + 0.25*(COUNT(all(t.ticket_id)) / airplane.num_of_seats >= 0.8)), 2) as market_price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats as total_capacity, COUNT(all(tbb.ticket_id)) as num_of_tickets_sold FROM flight JOIN airplane ON flight.airplane_id = airplane.airplane_id JOIN ticket as t ON t.flight_num = flight.flight_num JOIN ticket_bought_by as tbb on t.ticket_id = tbb.ticket_ID WHERE email_address = ? AND tbb.purchase_date BETWEEN DATE_SUB(current_date(), INTERVAL 1 YEAR) AND current_date() GROUP BY t.price, flight.flight_num, tbb.purchase_date, airplane.airplane_id, airplane.num_of_seats;"

        
        const customerYearPurchases = await db.promise().query(customerYearPurchasesQuery, [email], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log("Found all the flight purchases a customer has made");
            }
        });

        // let numPurchases = customerYearPurchases.length;
        // for (let purchaseInd = 0; purchaseInd < numPurchases; purchaseInd++) {
        //     console.log(customerYearPurchases[purchaseInd]);
        // }
        let sum = 0;
        for (let ind = 0; ind < customerYearPurchases.length; ind++) {
            for (let ind2 = 0; ind2 < customerYearPurchases[ind].length; ind2++) {
                const purchase_info = customerYearPurchases[ind][ind2];
                if (purchase_info.market_price != null) {
                    sum = (Math.round((sum + Number(purchase_info.market_price)) * 100) / 100);
                }
            }
        }

        return sum.toString();  // cannot do res.send(values) with a string
    }
}


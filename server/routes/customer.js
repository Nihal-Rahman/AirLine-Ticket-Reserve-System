const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const { validateToken } = require("../middleware/auth.js");
const db = require('../connection');
const e = require('express');


router.get("/viewFlights", validateToken, (req, res) => {

    const email = req.userInfo.userEmail;

    const theUser = new Customer();

    const flightInfo = theUser.getFlightsFromDB(email);

    flightInfo.then(values => {
        res.send(values);
    })

});

router.get("/cancellableFlights", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;

    const theUser = new Customer();

    const flightInfo = theUser.getFlightsFromDB(email);

    flightInfo.then(values => {
        res.send(values);
    })
});

router.post("/cancelFlights", validateToken, (req, res) => {

    const theUser = new Customer();

    if (req.body.length > 1) {
        var i = 0
        while (i < req.body.length) {
            theUser.cancel(req.body[i]);
            i++
        }
    }
    else {
        theUser.cancel(req.body[0]);
    }
    res.send({ succ: "success" });
});

router.post("/search", validateToken, (req, res) => {
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;
    const rdate = req.body.rdate;
    const roundone = req.body.roundone

    if (roundone === "One Way") {
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";
        const unsoldSql = "select flight_num, count(*) as unsold, num_of_seats from flight natural join airplane natural join ticket where(departure_airport = ? and arrival_airport = ? and departure_date = ?) and(ticket_id not in (select ticket_id from ticket_bought_by)) group by flight_num"
        let percentFull = 100;

        db.query(unsoldSql, [departure, arrival, ddate], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            else {
                if (result[0]) {
                    percentFull = (result[0].unsold / result[0].num_of_seats) * 100
                }
            }
        })

        db.query(sql, [departure, arrival, ddate], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }

            if (percentFull <= 20) {
                result.forEach(ticket => {
                    let new_price = String(Number(ticket.price) * 1.25)
                    ticket.price = new_price;
                    const updateSql = "UPDATE ticket SET price = ? WHERE (ticket_ID = ?) and (flight_num = ?) and (departure_date = ?) and (departure_time = ?) and ? not in (SELECT ticket_id FROM ticket_bought_by)"
                    db.query(updateSql, [new_price, ticket.ticket_ID, ticket.flight_num, ddate, ticket.departure_time, ticket.ticket_ID], (err, res) => {
                        if (err) throw err;
                    })
                });
            }
            res.send({ tickets: result });
        });
    }
    else {
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";

        const unsoldSql = "select flight_num, count(*) as unsold, num_of_seats from flight natural join airplane natural join ticket where(departure_airport = ? and arrival_airport = ? and departure_date = ?) and(ticket_id not in (select ticket_id from ticket_bought_by)) group by flight_num"
        let percentFull1 = 100;

        db.query(unsoldSql, [departure, arrival, ddate], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            else {
                if (result[0]) {
                    percentFull1 = (result[0].unsold / result[0].num_of_seats) * 100
                }
            }
        })

        let percentFull2 = 100;

        db.query(unsoldSql, [departure, arrival, rdate], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            else {
                if (result[0]) {
                    percentFull2 = (result[0].unsold / result[0].num_of_seats) * 100
                }
            }
        })


        const sql2 = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";

        db.query(sql, [departure, arrival, ddate], (err, result1) => {
            if (err) {
                console.log(values);
                throw err;
            }
            db.query(sql2, [arrival, departure, rdate], (err, result2) => {
                if (err) {
                    console.log(values);
                    throw err;
                }
                const updateSql = "UPDATE ticket SET price = ? WHERE (ticket_ID = ?) and (flight_num = ?) and (departure_date = ?) and (departure_time = ?) and ? not in (SELECT ticket_id FROM ticket_bought_by)"

                if (percentFull1 <= 20) {
                    result1.forEach(ticket => {
                        let new_price1 = String(Number(ticket.price) * 1.25)
                        ticket.price = new_price1;
                        db.query(updateSql, [new_price1, ticket.ticket_ID, ticket.flight_num, ddate, ticket.departure_time, ticket.ticket_ID], (err, res) => {
                            if (err) throw err;
                        })
                    });
                }

                if (percentFull2 <= 20) {
                    result2.forEach(ticket => {
                        let new_price2 = String(Number(ticket.price) * 1.25)
                        ticket.price = new_price2;
                        db.query(updateSql, [new_price2, ticket.ticket_ID, ticket.flight_num, rdate, ticket.departure_time, ticket.ticket_ID], (err, res) => {
                            if (err) throw err;
                        })
                    });
                }

                res.send({ departure1: result1, departure2: result2 });
            })
        });
    }
});

router.post("/homeSearch", (req, res) => {
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;
    const rdate = req.body.rdate;
    const roundone = req.body.roundone

    if (roundone === "One Way") {
        const sql = "SELECT * FROM flight WHERE departure_airport = ? and arrival_airport = ? and departure_date = ?;";
        db.query(sql, [departure, arrival, ddate], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            res.send({ tickets: result });
        });
    }
    else {
        const sql = "SELECT * FROM flight WHERE departure_airport = ? and arrival_airport = ? and departure_date = ?;";
        db.query(sql, [departure, arrival, ddate], (err, result1) => {
            if (err) {
                console.log(values);
                throw err;
            }
            db.query(sql, [arrival, departure, rdate], (err, result2) => {
                if (err) {
                    console.log(values);
                    throw err;
                }
                res.send({ departure1: result1, departure2: result2 });
            })
        });
    }
});

router.post("/home", (req, res) => {
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;

    const theUser = new Customer();
    const ticketInfo = theUser.searchFlights(departure, arrival, ddate);

    ticketInfo.then(values => {
        res.send(values);
    });
});

router.post("/writeReview", validateToken, (req, res) => {
    const theUser = new Customer();  //creates customer relation object

    const email = req.userInfo.userEmail;
    const flightNum = req.body.flightNum;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const rating = req.body.rating;
    const comment = req.body.comment;

    const newReview = [email, flightNum, departure_date, departure_time, rating, comment]

    const sql = "INSERT INTO Review VALUES (?,?,?,?,?,?);";

    db.query(sql, newReview, (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Insert Success"); 
    });

    res.json("Thank you for your feedback!");
});

router.get("/retrieveReviews", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const listOfReviews = theUser.getCustomerReviews(email);

    listOfReviews.then(values => {
        res.send(values)
    });
});


router.post("/buy", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;

    const info = req.body;

    const theUser = new Customer();

    theUser.payForTickets(info, email);

    res.send({ succ: "success" });
})

router.post("/checkLogin", validateToken, (req, res) => {
    if (req.userInfo.email) {
        res.send({ succ: "success" });
    }
})

router.get("/viewFlights/past", validateToken, (req, res) => {

    const email = req.userInfo.userEmail;

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name, flight_status FROM Ticket NATURAL JOIN Ticket_Bought_By NATURAL JOIN Flight WHERE email_address = ? AND (CURRENT_DATE > DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
})

router.get("/viewFlights/today", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name, flight_status FROM Ticket NATURAL JOIN Ticket_Bought_By NATURAL JOIN Flight WHERE email_address = ? AND (CURRENT_DATE = DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})

router.get('/retrieveYearlySpending', validateToken, (req, res) => {
    const customerYearPurchasesQuery = "select sum(price) as total from ticket_bought_by natural join ticket where email_address = ? and purchase_date BETWEEN DATE_SUB(current_date(), INTERVAL 1 YEAR) AND current_date()"
    const email = req.userInfo.userEmail;

    db.query(customerYearPurchasesQuery, email, (err, result) => {
        if (err) { throw err; }
        else {
            res.send(result[0].total)
        }
    })
})

router.get('/retrieveSixMonthSpending', validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const sixMonthPurchases = theUser.getSixMonthSpending(email);

    sixMonthPurchases.then(values => {
        res.send(values);
    });
    console.log("Successfully retrieved customer's spending over the past six months");
});


router.get('/retrieveSpendingOverRange', validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const start = req.query.data.start;
    const end = req.query.data.end;
    //console.log(req.query.data.start);
    //console.log(req.query.data.end);
    const theUser = new Customer();
    const purchasesOverRange = theUser.getSpendingOverRange(email, start, end);

    purchasesOverRange.then(values => {
        res.send(values);
    });
    console.log("Successfully retrieved customer's spending over the range given");
});



module.exports = router;
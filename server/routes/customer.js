const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const {validateToken} = require("../middleware/auth.js");
const db = require('../connection');
const e = require('express');

router.get("/viewFlights", validateToken, (req, res) => {

    const email = req.userInfo.userEmail;

    const theUser = new Customer();

    const flightInfo = theUser.getFlightsFromDB(email);

    flightInfo.then( values => {
        res.send(values);
    })
    
});

router.get("/cancellableFlights", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;

    const theUser = new Customer();

    const flightInfo = theUser.getFlightsFromDB(email);

    flightInfo.then( values => {
        res.send(values);
    })
});

router.post("/cancelFlights", validateToken, (req, res)=> {

    const theUser = new Customer();

    if(req.body.length > 1){
        var i = 0
        while(i < req.body.length){
            theUser.cancel(req.body[i]);
            i++
        }
    }
    else{
        theUser.cancel(req.body[0]);
    }
    res.send({succ: "success"});
});

router.post("/search", validateToken, (req, res) => {
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;
    const rdate = req.body.rdate;
    const roundone = req.body.roundone
    console.log(roundone) 

    if (roundone === "One Way") {
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";
        db.query(sql, [departure, arrival, ddate], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            res.send({ tickets: result });
        });
    }
    else {
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";
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

router.post("/home", (req, res) =>{
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;

    const theUser = new Customer();
    const ticketInfo = theUser.searchFlights(departure, arrival, ddate);

    ticketInfo.then( values => {
        res.send(values);
    });
});

router.post("/writeReview", validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const flight_num = req.body.flightNum;
    const departureDate = req.body.departure_date;
    const departureTime = req.body.departure_time;
    const rating = req.body.rating;
    const comment = req.body.comment;
    //res.console.log([email, flightNum, departure_date, departure_time, rating, comment]);
    const newReview = [email, flight_num, departureDate, departureTime, rating, comment];
    res.json(newReview);
    const theUser = new Customer();  //creates review relation object
    theUser.insertNewReview(newReview);  // inserts the review info into the database

    res.json("Thank you for your feedback!");
}); 

router.get("/retrieveReviews", validateToken, (req, res) => {
    //console.log("Hello World");
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const listOfReviews = theUser.getCustomerReviews(email);

    listOfReviews.then( values => {
        res.send(values);
    });
});

router.get('/retrieveYearlySpending', validateToken, async(req, res) => {
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const yearlyPurchases = theUser.getYearlyTotal(email);

    yearlyPurchases.then(value => {
        res.send(value);
    });
    console.log("Successfully retrieved customer's yearly spending");

}); 

router.get('/retrieveSixMonthSpending', validateToken, async(req, res) => {
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const sixMonthPurchases = theUser.getSixMonthSpending(email);

    sixMonthPurchases.then(values => {
        res.send(values);
    });
    console.log("Successfully retrieved customer's spending over the past six months");
    //console.log(sixMonthPurchases);
}); 


router.get('/retrieveSpendingOverRange', validateToken, async(req, res) => {
    const email = req.userInfo.userEmail;
    const start = req.query.data.start;
    const end = req.query.data.end;
    console.log(req.query.data.start);
    console.log(req.query.data.end);
    const theUser = new Customer();
    const purchasesOverRange = theUser.getSpendingOverRange(email, start, end);

    purchasesOverRange.then(values => {
        res.send(values);
    });
    console.log("Successfully retrieved customer's spending over the range given");
}); 



router.post("/buy", validateToken, (req, res)=>{
    const email = req.userInfo.userEmail;

    const info = req.body;

    const theUser = new Customer();

    theUser.payForTickets(info, email);

    res.send({succ: "success"});
})

router.post("/checkLogin", validateToken, (req, res) => {
    if(req.userInfo.email){
        res.send({succ: "success"});
    }
})

router.get("/viewFlights/past", validateToken, (req,res)=>{

    const email = req.userInfo.userEmail;

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name, flight_status FROM Ticket NATURAL JOIN Ticket_Bought_By NATURAL JOIN Flight WHERE email_address = ? AND (CURRENT_DATE > DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) =>{
        if(err){
            //console.log(values);
            throw err;
        }
        else{
        res.send(result);
        }
    })
})

router.get("/viewFlights/today", validateToken, (req,res)=>{
    const email = req.userInfo.userEmail;

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name, flight_status FROM Ticket NATURAL JOIN Ticket_Bought_By NATURAL JOIN Flight WHERE email_address = ? AND (CURRENT_DATE = DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) =>{
        if(err){
            //console.log(values);
            throw err;
        }
        res.send(result);
    })
})

router.get('/retrieveYearlySpending', validateToken, (req, res) => {
    console.log("Im here");
    const email = req.userInfo.userEmail;
    console.log("Im here");
    const theUser = new Customer();
    const yearlyPurchases = theUser.getYearlyTotal(email);

    yearlyPurchases.then(value => {
        res.send(value);
        console.log("Successfully retrieved customer's yearly spending");
    });
});

router.get('/retrieveSixMonthSpending', validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const theUser = new Customer();
    const sixMonthPurchases = theUser.getSixMonthSpending(email);

    sixMonthPurchases.then(values => {
        res.send(values);
        console.log("Successfully retrieved customer's spending over the past six months");
    });
    
    //console.log(sixMonthPurchases);
});


router.get('/retrieveSpendingOverRange', validateToken, (req, res) => {
    const email = req.userInfo.userEmail;
    const start = req.query.data.start;
    const end = req.query.data.end;
    console.log(req.query.data.start);
    console.log(req.query.data.end);
    const theUser = new Customer();
    const purchasesOverRange = theUser.getSpendingOverRange(email, start, end);

    purchasesOverRange.then(values => {
        res.send(values);
    });
    console.log("Successfully retrieved customer's spending over the range given");
}); 



module.exports = router;
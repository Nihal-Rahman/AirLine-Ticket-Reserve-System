const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const {validateToken} = require("../middleware/auth.js");
const db = require('../connection');

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

router.post("/search", validateToken, (req, res) =>{
    const departure = req.body.dair;
    const arrival = req.body.aair;
    const ddate = req.body.ddate;
    const roundone = req.body.roundone

    /*
    const theUser = new Customer();
    const ticketInfo = theUser.searchFlights(departure, arrival, ddate, roundone);

    ticketInfo.then( values => {
        res.send(values);
    });
    */

    if(roundone === "Oneway"){
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";
        db.query(sql, [departure, arrival, ddate], (err, result) => {
            if(err){
                console.log(values);
                throw err;
            }
            res.send({tickets: result});
        });
    }
    else{
        const sql = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date = ?);";
        const sql2 = "SELECT * FROM ticket where ticket_id not in (SELECT ticket_id FROM ticket_bought_by) AND flight_num IN (SELECT flight_num FROM flight where departure_airport = ? and arrival_airport = ? and departure_date > ?);";
        db.query(sql, [departure, arrival, ddate], (err, result1) => {
            if(err){
                console.log(values);
                throw err;
            }
            db.query(sql2, [arrival, departure, ddate], (err, result2) =>{
                if(err){
                    console.log(values);
                    throw err;
                }
                res.send({departure1:result1, departure2:result2});
            })
        });
    }
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

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM Ticket NATURAL JOIN Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE > DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) =>{
        if(err){
            console.log(values);
            throw err;
        }
        res.send(result);
    })
})

router.get("/viewFlights/today", validateToken, (req,res)=>{
    const email = req.userInfo.userEmail;

    const sql = "SELECT ticket_ID, flight_num, departure_date, departure_time, airline_name, first_name, last_name FROM Ticket NATURAL JOIN Ticket_Bought_By WHERE email_address = ? AND (CURRENT_DATE = DEPARTURE_DATE);"

    db.query(sql, [email], (err, result) =>{
        if(err){
            console.log(values);
            throw err;
        }
        res.send(result);
    })
})



module.exports = router;
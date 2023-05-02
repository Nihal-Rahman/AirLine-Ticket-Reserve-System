const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const {validateToken} = require("../middleware/auth.js");

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

    const theUser = new Customer();
    const ticketInfo = theUser.searchFlights(departure, arrival, ddate);

    ticketInfo.then( values => {
        res.send(values);
    });
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

module.exports = router;
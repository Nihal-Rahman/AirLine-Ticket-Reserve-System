const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const Review = require('../relations/review.js');
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

router.post("/writeReview", validateToken, (req, res) => {
    const email = req.body.email;
    const flightNum = req.body.flightNum;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const rating = req.body.rating;
    const comment = req.body.comment;

    const review = new Review(email, flightNum, departure_date, departure_time, rating, comment);

    review.insert();

    res.json("Thank you for your feedback!");
});

router.get("/retrieveReviews", validateToken, (req, res) => {
    //console.log("Hello World");
    const email = req.userInfo.userEmail;
    const review = new Review();
    const listOfReviews = review.getCustomerReviews(email);

    listOfReviews.then( values => {
        res.send(values)
    });
    console.log("Successfully retrieved the past customer reviews");
});

// router.get('/retrieveSpending', validateToken, async(req, res) => {
    
// }); 
router.post("/buy", validateToken, (req, res)=>{
    const email = req.userInfo.userEmail;

    const info = req.body;

    const theUser = new Customer();

    theUser.payForTickets(info, email);

    res.send({succ: "success"});
})

module.exports = router;
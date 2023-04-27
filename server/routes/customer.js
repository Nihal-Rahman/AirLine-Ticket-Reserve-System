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

module.exports = router;
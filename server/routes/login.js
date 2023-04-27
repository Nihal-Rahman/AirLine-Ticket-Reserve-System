const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const Staff = require('../relations/staff.js');

const {sign} = require('jsonwebtoken');


router.post("/", (req, res) => {
    const user = req.body;
    const theUser = new Customer();
    
    const isValid = theUser.getfromDB(user.email, user.pass);
    isValid.then(value => {
        if (value === false) {
            console.log("User not found");
            res.json({error: "Incorrect login information "});
        }
        else {
            console.log("User found");
            const accessToken = sign({userEmail: user.email, typeofUser: "customer"}, "ilovedatabases");
            res.json(accessToken);
        }
    });
});

router.post("/staff", (req, res) => {
    const user = req.body;
    const theUser = new Staff();

    const isValid = theUser.getfromDB(user.username, user.password);
    isValid.then(value => {
        if (value === false) {
            console.log("User not found");
            res.json({error: "Incorrect login information "});
            
        }
        else {
            console.log("User found");
            const accessToken = sign({userEmail: user.username, typeofUser: "flightStaff"}, "ilovedatabases");
            res.json(accessToken);
        }
    });
});



module.exports = router;
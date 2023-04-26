const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const Staff = require('../relations/staff.js');


router.post("/", (req, res) => {
    const user = req.body;
    const theUser = new Customer();
    const isValid = theUser.getfromDB(user.email, user.pass);
    isValid.then(value => {
        if (value === false) {
            console.log("User not found");
            res.send("User not found yo");
        }
        else {
            console.log("User found");
            res.send("User found");
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
            res.send("User not found yo");
        }
        else {
            console.log("User found");
            res.send("User found");
        }
    });
});



module.exports = router;
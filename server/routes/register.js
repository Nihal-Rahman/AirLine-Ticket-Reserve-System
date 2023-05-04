const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');
const Staff = require('../relations/staff.js');
const bcrypt = require("bcrypt");


router.post("/", (req, res) => {
    const user = req.body;
    /*
    const newUser = new Customer(user);
    newUser.insert();
    res.json('successs!');
    console.log('success!');
    */
    bcrypt.hash(user.pass, 10).then((hash) => {
        user.pass = hash;
        new Customer(user).insert();
        res.json("SUCCESS");
    });
   
});

router.post("/staff", (req,res) => {
    const { username, password, email, firstName, lastName, dob, airline, phoneNum } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        new Staff({
            username: username,
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            airline: airline,
            phoneNum: phoneNum,
        }).insert();

        res.json("SUCCESS");
    });

    


    // const user = req.body;
    // const newUser = new Staff(user);
    //newUser.insert();
    // res.json('successs!');
    // console.log('success!');
});

module.exports = router;
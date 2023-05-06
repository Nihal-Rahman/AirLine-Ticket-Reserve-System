const express = require('express');
const router = express.Router();
const db = require('../connection');
const bcrypt = require("bcrypt");
const Customer = require('../relations/customer.js');
const Staff = require('../relations/staff.js');

const {sign} = require('jsonwebtoken');


router.post("/", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    const sql = "SELECT email_address, passcode FROM Customer WHERE email_address = ?;"

    db.query(sql, [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        } 

        if (result.length > 0) {
            bcrypt.compare(pass, result[0].passcode, (error, response) => {
                if (response) {
                    const accessToken = sign({ userEmail: email, typeofUser: "customer" }, "ilovedatabases");
                    res.json(accessToken);
                }
                else { 
                    res.send({ error: "Wrong user/pass combo" })
                }
            })
        }
        else {
            res.send({ error: "User doesn't exist" });
        }
    })
});

router.post("/staff", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT userName, passcode, airline_name FROM Airline_Staff WHERE userName = ?;"

    db.query(sql, [username], (err, result) => {
        if (err) {
            res.send({ error: err });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].passcode, (error, response) => {
                if (response) {
                    console.log("success!!!! logged in.");

                    const accessToken = sign(
                        { username: username, typeofUser: "staff", airline: result[0].airline_name },
                        "ilovedatabases"
                    );
                    res.json(accessToken);
                }
                else {
                    res.send({ error: "Wrong user/pass combo" })
                }
            })
        }
        else {
            res.send({ error: "User doesn't exist" });
        }
    })
});

module.exports = router;
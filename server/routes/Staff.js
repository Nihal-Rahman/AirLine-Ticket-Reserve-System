const express = require('express')
const router = express.Router()
const { Staffs } = require('../models')
const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
    const listOfStaff = await Staffs.findAll();
    res.json(listOfStaff);
});

// router.post("/", async (req, res) => {
//     const post = req.body;
//     await Staffs.create(post);
//     res.json(post);
// });

router.post("/", async (req, res) => {
    const { username, password, email, firstName, lastName, dob, airline, phoneNum } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        Staffs.create({
            username: username,
            email: email,
            password: hash,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            airline: airline,
            phoneNum: phoneNum,
        });

        res.json("SUCCESS");
    });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Staffs.findOne({ where: { username: username } });

    if (!user) { res.json({ error: 'User does not exist' }) }
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) { res.json({ error: 'Wrong username and password combination' }) }
            else {
                res.json("You logged in!");
                console.log("Login successful");
            }
        });
    };
});

module.exports = router  
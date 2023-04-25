const express = require('express');
const router = express.Router();
const Customer = require('../relations/customer.js');

router.get("/", (req, res) => {
    res.json("Hello World");
});

router.post("/", (req, res) => {
    const user = req.body;
    const newUser = new Customer(user);
    newUser.insert();
    res.json('successs!');
    console.log('success!');
})



module.exports = router;
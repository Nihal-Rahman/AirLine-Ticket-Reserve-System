const express = require('express');
const router = express.Router();
const Customer = require('path to customer.js file from your computer');

router.get("/", (req, res)=>{
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
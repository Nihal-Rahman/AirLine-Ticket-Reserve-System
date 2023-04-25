const express = require('express');
const router = express.Router();
const Staff = require('../relations/staff.js');

router.post("/", (req, res) => {
    const user = req.body;
    const newUser = new Staff(user);
    newUser.insert();
    res.json('successs!');
    console.log('success!');
})



module.exports = router;
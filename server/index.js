require('./connection');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const register = require('./routes/register');
app.use("/register", register);

/*
const staff_register = require('./routes/registr');
app.use("/register/staff", staff_register);
*/

const login = require('./routes/login');
app.use("/login", login);

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
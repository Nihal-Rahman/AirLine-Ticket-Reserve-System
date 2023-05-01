require('./connection');
const bodyParser = require('body-parser')


const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

const register = require('./routes/register');
app.use("/register", register);
 

const login = require('./routes/login');
app.use("/login", login);


const customer = require('./routes/customer');
app.use("/customer", customer);

const staff = require('./routes/staff');
app.use('/staff', staff);

app.listen(3001, () => { 
    console.log("Server running on port 3001");
});
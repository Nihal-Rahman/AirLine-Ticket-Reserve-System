require('./connection');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const home = require('./routes/register');
app.use("/register", home);

app.listen(3001, ()=>{
    console.log("Server running on port 3001");
});

const db = require('./models');

// Routers
const staffRouter = require('./routes/Staff')
app.use("/Staffs", staffRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
}) 

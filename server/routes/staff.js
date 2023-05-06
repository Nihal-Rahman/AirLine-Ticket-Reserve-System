const express = require("express");
const router = express.Router();
const Staff = require('../relations/staff.js');
const db = require('../connection');
const cors = require("cors")
const {validateToken} = require("../middleware/auth");

router.get('/flights', validateToken, (req, res) =>{
    const sqlSelect = "SELECT * FROM flight WHERE airline_name = ? AND departure_date BETWEEN CURRENT_DATE AND DATE_ADD(NOW(),INTERVAL 1 MONTH)";
    db.query(sqlSelect, req.userInfo.airline, (err, result) =>{
        res.send(result);
    });
})

router.get('/flights/current', validateToken, (req, res) =>{
    const sqlSelect = "SELECT * FROM flight WHERE airline_name = ? AND departure_date = CURRENT_DATE";
    db.query(sqlSelect, req.userInfo.airline, (err, result) =>{
        res.send(result);
    });
})

router.get('/flights/future', validateToken, (req, res) =>{
    const sqlSelect = "SELECT * FROM flight WHERE airline_name = ? AND ((departure_date > CURRENT_DATE) OR (departure_date = CURRENT_DATE AND departure_time > CURRENT_TIME))";
    db.query(sqlSelect, req.userInfo.airline, (err, result) =>{
        res.send(result);
    });
})

router.get('/flights/past', validateToken, (req, res) =>{
    const sqlSelect = "SELECT * FROM flight WHERE airline_name = ? AND departure_date < CURRENT_DATE";
    db.query(sqlSelect, req.userInfo.airline, (err, result) =>{
        res.send(result);
    });
})

router.post('/reviews', validateToken, (req, res) =>{
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;

    const sqlSelect = "SELECT * FROM review WHERE (flight_num = ?) and (departure_date = ?) and (departure_time = ?)"
    db.query(sqlSelect, [flight_num, departure_date, departure_time], (err, result) => {
        res.send(result);
    });
})

router.post('/customers', validateToken, (req, res) =>{
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;

    const sqlSelect = "SELECT * FROM ticket_bought_by NATURAL JOIN ticket WHERE (flight_num = ?) and (departure_date = ?) and (departure_time = ?)"
    db.query(sqlSelect, [flight_num, departure_date, departure_time], (err, result) => {
        console.log(result)
        res.send(result);
    });
})

router.post('/avgRating', validateToken, (req, res) =>{
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;

    const sqlSelect = "SELECT avg(rating) as average FROM review WHERE (flight_num = ?) and (departure_date = ?) and (departure_time = ?)"
    db.query(sqlSelect, [flight_num, departure_date, departure_time], (err, result) => {
        res.send(result[0].average);
    });
})
 
router.post('/create-flight', validateToken, (req, res)=>{
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const arrival_date = req.body.arrival_date;
    const arrival_time = req.body.arrival_time;
    const departure_airport = req.body.departure_airport;
    const arrival_airport = req.body.arrival_airport;
    const airline_name = req.body.airline_name;
    const airplane_ID = req.body.airplane_ID;
    const flight_status = req.body.flight_status;
    let seats;
    let price;
    let ticket_ID;

    const sqlSelect = "SELECT num_of_seats FROM Airplane WHERE airplane_ID = ?"
    db.query(sqlSelect, airplane_ID, (err, result) => {
        seats = result[0].num_of_seats
        price = Math.floor(((Math.random() * (300 - 50)) + 50) * 100) / 100;

        const insertTickets = "INSERT INTO ticket VALUES (?,?,?,?,?,?)";
        for (let index = 0; index < seats; index++) {
            ticket_ID = String(Math.floor(Math.random() * 10000000000000000));
            db.query(insertTickets, [ticket_ID, price, flight_num, departure_date, departure_time, airline_name], (err, result) => {
                if (err) console.log(err);
            });
        }
    })
    
    const sqlInsert = "INSERT INTO flight VALUES (?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert, [flight_num, departure_date, departure_time, 
        arrival_date, arrival_time, departure_airport, arrival_airport, 
        airline_name, airplane_ID, flight_status], (err, result)=>{})
}); 

router.post('/add-plane', validateToken, (req, res) => {
    const airplane_ID = req.body.airplane_ID;
    const num_of_seats = req.body.num_of_seats;
    const manufactoring_comp = req.body.manufactoring_comp;
    const manufactoring_date = req.body.manufactoring_date;
    const age = req.body.age;
    const airline_name = req.body.airline_name;

    const sqlInsert = "INSERT INTO airplane VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [airplane_ID, num_of_seats, manufactoring_comp, manufactoring_date, age, airline_name], (err, result) => { })
}); 

router.post('/add-airport', validateToken, (req, res) => {
    const airport_code = req.body.airport_code;
    const airport_name = req.body.airport_name;
    const city = req.body.city;
    const country = req.body.country;
    const airport_type = req.body.airport_type;

    const sqlInsert = "INSERT INTO airport VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [airport_code, airport_name, city, country, airport_type], (err, result) => { })
}); 

router.put('/update-status', validateToken, (req, res) => {
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const flight_status = req.body.flight_status;
    
    const sqlUpdate = "UPDATE flight SET flight_status = ? WHERE (flight_num = ?) and (departure_date = ?) and (departure_time = ?)"
    db.query(sqlUpdate, [flight_status, flight_num, departure_date, departure_time], (err, result) => {
        if (err) console.log(err);
    });
});

router.post('/flight', validateToken, (req, res) => {
    const flight_num = req.body.flight_num;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const sqlSelect = "SELECT * FROM flight WHERE (flight_num = ?) and (departure_date = ?) and (departure_time = ?)"
    db.query(sqlSelect, [flight_num, departure_date, departure_time], (err, result) => {
        res.send(result);
    });
});

router.get('/flightsFromPastYear', validateToken, (req, res) => {

    const sql = 'SELECT * FROM Ticket_Bought_By NATURAL JOIN Ticket WHERE departure_date >= DATE_SUB(NOW(),INTERVAL 1 YEAR) AND airline_name = ?;'
    db.query(sql, [req.userInfo.airline], (err, result) => {
        res.send(result);
    });
});


router.get('/ticketSoldRevenue', validateToken, (req, res) => {
    const sql = 'SELECT COUNT(ticket_ID), SUM(price) FROM Ticket NATURAL JOIN Ticket_Bought_By WHERE airline_name = ? AND purchase_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 YEAR) AND CURRENT_DATE';

    db.query(sql, [req.userInfo.airline], (err, result1) => {
        if (err) console.log(err);
        else {
            const sql1 = 'SELECT COUNT(ticket_ID), SUM(price) FROM Ticket_Bought_By NATURAL JOIN Ticket WHERE airline_name = ? AND purchase_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND CURRENT_DATE;'

            db.query(sql1, [req.userInfo.airline], (err, result2) => {
                if (err) console.log(err);
                res.send({ monthly: result2, yearly: result1 });
            })
        }
    })

});

router.post('/ticketDateRange', validateToken, (req, res) => {
    const sql = 'SELECT purchase_date , COUNT(purchase_date) FROM Ticket_Bought_By NATURAL JOIN Ticket WHERE airline_name = ? AND purchase_date BETWEEN ? AND ? GROUP BY purchase_date';
    const dates = req.body;
    db.query(sql, [req.userInfo.airline, dates.bdate, dates.edate], (err, results) => {
        if (err) console.log(err);
        console.log(results)
        res.send(results);
    })
});

router.get('/navbar', validateToken, (req, res) => {
    if (req.userInfo.userEmail){
        res.send("customer");
    }
    else if (req.userInfo.username){
        res.send("staff");
    }
    else{
        res.send("none");
    }
})


module.exports = router; 
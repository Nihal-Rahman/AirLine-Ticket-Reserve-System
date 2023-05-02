const db = require('../connection');
const bcrypt = require('bcrypt');

module.exports = class Review {
    constructor(newReview) {
        if (newReview != null) {
            this.email = newCustomer.email;
            this.flightNum = newCustomer.flightNum;
            this.departure_date = newCustomer.departure_date;
            this.departure_time = newCustomer.departure_time;
            this.rating = newCustomer.rating;
            this.comment = newCustomer.comment;
        }
    }

    getInfo() {
        console.log(this.email);
    }

    insert() {
        const sql = "INSERT INTO Review VALUES (?,?,?,?,?,?);";
        var values = [this.email, this.flightNum, this.departure_date, this.departure_time, this.rating, this.comment];


        // if (this.departure_date > CURRENT_DATE) {
        //     alert("Cannot write a review on a future flight");
        // }



        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Insert Success");
        });

    }

    async getCustomerReviews(email){
        const sql = "SELECT flight_num, rating, comments FROM Review WHERE email_address = ?;"
        const listOfReviews = await db.promise().query(sql, [email], (err, result) => {
            if (err) {
                console.log(values);
                throw err;
            }
            console.log("Found all customer review info!");
        });

        console.log("List of reviews: ", listOfReviews);
        
        return listOfReviews;
    }
}
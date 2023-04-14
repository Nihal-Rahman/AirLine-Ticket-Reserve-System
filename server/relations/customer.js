const db = require('path to connection.js file from your computer');


module.exports = class Customer{
    constructor(newCustomer){
        this.email = newCustomer.email;
        this.firstName = newCustomer.first;
        this.lastName = newCustomer.last;
        this.password = newCustomer.pass;
        this.buildingNum = newCustomer.buildnum;
        this.street = newCustomer.street;
        this.apt = newCustomer.apt;
        this.city = newCustomer.city;
        this.state = newCustomer.state;
        this.zipCode = newCustomer.zip;
        this.passNum = newCustomer.passnum;
        this.passCountry = newCustomer.passcountry;
        this.passExpiration = newCustomer.passexpire;
        this.dob = newCustomer.dob;
    }

    getInfo() {
        console.log(this.email, this.firstName, this.lastName);
    }

    insert(){
        const sql = "INSERT INTO Customer VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        var values = [this.email, this.firstName, this.lastName, this.password, this.buildingNum, this.street, this.apt, this.city, this.state, this.zipCode, this.passNum, this.passCountry, this.passExpiration, this.dob];

        
        
        db.query(sql, values, (err, result)=>{
            if(err){ 
                console.log(values);
                throw err;
            }
            console.log("Insert Success");
        })
    }
}
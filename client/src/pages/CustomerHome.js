import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react"; 
import CustomerNavbar from '../components/CustomerNavbar'

function CustomerHome(){

    const [listOfFlights, setListOfFlights] = useState([]);

    /*
    const getUserFlights = () => {
        axios.get("localhost:3001/customer/viewFlights", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((response)=>{
            if(response.data.error){
                alert("You are not logged in!");
            } else{}
        })
    }
    */

    useEffect(() => {
        axios.get("http://localhost:3001/customer/viewFlights",
          {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            alert("You are not logged in!");
          } else {
            setListOfFlights(response.data);
          }
        });
      }, []);

    return(
      <div>
        <CustomerNavbar />
          <section>
              <h3>Your Upcoming Flights:</h3>
        <table className="table">
          <thead>
            <th>Ticket ID</th>
            <th>Airline Name</th>
            <th>Flight Num</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Airline Name</th>
            <th>First Name</th>
            <th>Last Name</th>
          </thead>
          <tbody>
            {listOfFlights.map((value,key) => {
              return ( 
                <tr> 
                  <td> {value.ticket_ID} </td> 
                  <td> {value.flight_num} </td> 
                  <td> {value.departure_date} </td> 
                  <td> {value.departure_time} </td>
                  <td> {value.airline_name} </td>
                  <td> {value.first_name} </td> 
                  <td> {value.last_name} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
          </section>
      </div>
    );
}

export default CustomerHome
import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerNavbar from '../components/CustomerNavbar'

function CustomerHome() {

  const [listOfFlights, setListOfFlights] = useState([]);

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

  const viewPast = ()=>{
    axios.get("http://localhost:3001/customer/viewFlights/past",
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
  }

  const viewPresent = ()=>{
    axios.get("http://localhost:3001/customer/viewFlights/today",
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
  }

  const viewFuture = ()=>{
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
  }

  return (
    <div>
      <CustomerNavbar/>
    <section>
      <div>Your Upcoming Flights:</div>
      <table className="table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Flight Num</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Airline Name</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listOfFlights.map((value, key) => {
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
      <button onClick={()=>{viewPresent()}}>View Today's Flights</button> 
      <button onClick={()=>{viewPast()}}>View Previous Flights</button>
      <button onClick={()=>{viewFuture()}}>View Future Flights</button>
    </section>
    </div>
  );
}

export default CustomerHome
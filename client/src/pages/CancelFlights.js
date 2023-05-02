import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react"; 

function CancelFlights(){

    const [listOfFlights, setListOfFlights] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/customer/cancellableFlights",
          {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            alert("You are not logged in!");
          } else {
            let flights = response.data;
            flights.map((data) => {
              return {select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time:data.departure_time, airline_name: data.airline_name, first_name: data.first_name, last_name: data.last_name }
            })
            setListOfFlights(flights);
          }
        });
      }, []);

      const cancelFlights = () => {
        var cancel = listOfFlights.map((data) => {
          if(data.select){
            return data.ticket_ID;
          }
        }).filter(a => a != null);

        axios.post("http://localhost:3001/customer/cancelFlights", cancel,
          {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        ).then((response)=>{
          window.location.reload(true);
        })
      }

      return(
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
                    <th>Cancel</th>
                </tr>
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
                    <td>
                        <input onChange = {(event)=>{
                          let checked = event.target.checked;
                          setListOfFlights(
                            listOfFlights.map(data => {
                              if(data.ticket_ID === value.ticket_ID){
                                data.select = checked;
                              }
                              return data;
                            })
                          );
                        }}type="checkbox" checked={value.select}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={cancelFlights}> Cancel </button>
        </section>
    );
}

export default CancelFlights
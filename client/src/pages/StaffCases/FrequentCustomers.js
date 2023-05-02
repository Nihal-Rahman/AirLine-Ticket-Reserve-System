import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function FrequentCustomers(){
    const [customers, setCustomers] = useState([]);
    const [flights, setFlights] = useState([]);
    const [view, setView] = useState(false);
    const [infoToView, setInfoToView] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:3001/staff/flightsFromPastYear", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
          }).then((response)=>{
            if (response.data.error) {
                alert("You are not logged in!");
              } else {
                setFlights(response.data);
                const consumers = flights.map((data)=>{
                        return data.email_address
                })
                let map = {};


                consumers.forEach((data)=>{
                    if(map[data]===1){
                        map[data] += 1;
                    }
                    else{
                        map[data] = 1;
                    }
                })

                let people = [];
                for(const peeps in map){
                    people.push({email: peeps, numFlights: map[peeps]});
                }
                setCustomers(people);
              }
          });
    });

    const viewInfo = (email)=>{
        const usersFlights = flights.map((data)=>{
            if(data.email_address === email){
                return data
            }
        }).filter(a => a != null);

        setInfoToView(usersFlights);
        setView(true);
    };

    const goBack = ()=>{
        setView(false);
        setInfoToView([]);
    }

    return(
            <section>
                {!view ? (
                    <>
                        <div>FrequentCustomers:</div>
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Email Address</th>
                                <th>Number of Flights Taken</th>
                                <th>View Flights</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((value) => {
                            return ( 
                                <tr> 
                                <td> {value.email} </td> 
                                <td> {value.numFlights} </td> 
                                <td>
                                <button onClick={()=>{viewInfo(value.email)}}>View Flight</button> 
                                </td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </>
                ):(
                    <>
                        <table className="table">
                        <thead>
                            <tr>
                                <th>TicketID</th>
                                <th>Flight Number</th>
                                <th>Departure Date</th>
                                <th>Departure Time</th>
                                <th>Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoToView.map((value) => {
                            return ( 
                                <tr> 
                                <td> {value.ticket_ID} </td> 
                                <td> {value.flight_num} </td> 
                                <td> {value.departure_date}</td>
                                <td> {value.departure_time}</td>
                                <td> {value.purchase_date}</td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                        <button onClick={()=>{goBack()}}> Back</button>
                    </>
                )
                }
          </section>
    )


}

export default FrequentCustomers
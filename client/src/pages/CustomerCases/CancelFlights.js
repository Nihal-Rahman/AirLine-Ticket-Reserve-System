import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react"; 
import CustomerNavbar from '../../components/CustomerNavbar';

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
        <div className=' text-3xl text-center'>
          <CustomerNavbar/>
          <section className='ml-20'>
            <div>Your Upcoming Flights:</div>
            <table className="table">
                <thead>
                    <tr>
                        <th className='underline'>Ticket ID</th>
                        <th className='underline'>Flight Num</th>
                        <th className='underline'>Departure Date</th>
                        <th className='underline'>Departure Time</th>
                        <th className='underline'>Airline Name</th>
                        <th className='underline'>First Name</th>
                        <th className='underline'>Last Name</th>
                        <th className='underline'>Cancel</th>
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
                        }} type="checkbox" style={{ transform: "scale(2)" }} checked={value.select}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={cancelFlights} className="mt-20 bg-[#424B5A] hover:bg-violet-300 text-white font-bold py-2 px-10 rounded-3xl">Cancel</button>
          </section>
        </div>
    );
}

export default CancelFlights
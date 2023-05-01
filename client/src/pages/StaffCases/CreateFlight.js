import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function CreateFlight() {
    const [flight_num, setFlightNum] = useState("");
    const [departure_date, setDepDate] = useState("");
    const [departure_time, setDepTime] = useState("");
    const [arrival_date, setArrDate] = useState("");
    const [arrival_time, setArrTime] = useState("");
    const [departure_airport, setDepAirport] = useState("");
    const [arrival_airport, setArrAirport] = useState("");
    const [airline_name, setAirline] = useState("");
    const [airplane_ID, setPlaneID] = useState("");
    const [flight_status, setStatus] = useState("on-time");

    const submitFlight = () => {
        axios.post('http://localhost:3001/staff/create-flight', { 
            flight_num, 
            departure_date, 
            departure_time, 
            arrival_date, 
            arrival_time, 
            departure_airport, 
            arrival_airport, 
            airline_name, 
            airplane_ID, 
            flight_status
        },
            {
                headers: { accessToken: sessionStorage.getItem("accessToken"),},
            }
        )
        .then(()=>{
            console.log("successful insert");
        });
    };

  return (
      <div>
          <div className='text-center mt-40'>
            <h1 className='text-7xl underline'>Create New Flight</h1>
            <div className='text-3xl mt-24'>
                <input type='text' name="flight_num" placeholder="Flight Number" onChange={(e) => setFlightNum(e.target.value)}/>
                <select className='mr-48' type='text' name="flight_status" onChange={(e) => setStatus(e.target.value)}>
                    <option>on-time</option>
                    <option>delayed</option>
                </select>
                <br />
                <br />

                <input type='text' name="departure_date" placeholder="Departure Date" onChange={(e) => setDepDate(e.target.value)} />
                <input type='text' name="departure_time" placeholder="Departure Time" onChange={(e) => setDepTime(e.target.value)} />
                <br />
                <br />

                <input type='text' name="arrival_date" placeholder="Arrival Date" onChange={(e) => setArrDate(e.target.value)} />
                <input type='text' name="arrival_time" placeholder="Arrival Time" onChange={(e) => setArrTime(e.target.value)} />
                <br/>
                <br/>
                <input type='text' name="departure_airport" placeholder="Departure Airport" onChange={(e) => setDepAirport(e.target.value)} />
                <input type='text' name="arrival_airport" placeholder="Arrival Airport" onChange={(e) => setArrAirport(e.target.value)} />
                <br />
                <br />

                <input type='text' name="airline_name" placeholder="Airline Name" onChange={(e) => setAirline(e.target.value)} />
                <input type='text' name="airplane_ID" placeholder="Airplane ID" onChange={(e) => setPlaneID(e.target.value)} />
                <br />
                <br />               
                <br />               
                <button onClick={submitFlight} className="bg-[#424B5A] hover:bg-violet-300 text-white font-bold py-2 px-10 rounded-3xl">Submit</button>

            </div>
        </div>
    </div>
  )
}

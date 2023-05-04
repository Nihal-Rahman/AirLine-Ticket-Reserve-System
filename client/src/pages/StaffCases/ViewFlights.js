import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../App.css'
import { useNavigate } from 'react-router-dom';

export default function ViewFlights() {
    let history = useNavigate();

    const [flightsList, setFlightsList] = useState([])

    const [flight_status, setStatus] = useState('on-time')

    const update = (flight_num, departure_date, departure_time) => {
        axios.put("http://localhost:3001/staff/update-status", {
            flight_num,
            departure_date,
            departure_time,
            flight_status
        },
            {
                headers: { accessToken: sessionStorage.getItem("accessToken"), },
            }
        );
    };

    useEffect(() => {
        axios.get("http://localhost:3001/staff/flights", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error){
                alert("You are not logged in!")
                history("/")
            }
            else{
                setFlightsList(response.data);
            }
        })
    }, [])

    return (
        <div>
            <h1 className='w-42 text-center mt-40 mb-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white'>Welcome.</h1>
            <h1 className='w-42 text-center mb-6 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Here are the upcoming flights</h1>
            <div className='ml-4 mr-4 grid gap-4 grid-cols-4 text-2xl'>
                {flightsList.map((val) => {
                    return (
                        <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                            <h1 onClick={() => { history(`/flight/${val.flight_num}/${val.departure_date}/${val.departure_time}`) }} className='w-42 mb-2 text-4xl font-black tracking-tight hover:underline hover:cursor-pointer hover:text-blue-400 text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {val.arrival_date} | {val.arrival_time} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.departure_airport} → {val.arrival_airport} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.airplane_ID} | {val.airline_name} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()}</p>
                            
                            <select onChange={(e) => {setStatus(e.target.value)}} className='inline-flex items-center px-3 py-2 text-xl text-white bg-slate-400 rounded-lg hover:bg-slate-500 dark:focus:ring-blue-800'>
                                <option>on-time</option>
                                <option>delayed</option>
                                <option>CANCELLED</option>
                            </select>
                            <button onClick={() => {update(val.flight_num, val.departure_date, val.departure_time)}} className='ml-2 inline-flex items-center px-3 py-2 text-xl text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>Update</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
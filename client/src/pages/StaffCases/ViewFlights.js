import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../App.css'
import { useNavigate } from 'react-router-dom';

export default function ViewFlights() {
    let history = useNavigate();

    const [searchTerm, setSearchTerm] = useState('')
    const [searchField, setSearchField] = useState("Flight Number")

    const [flightsList, setFlightsList] = useState([])

    const [flight_status, setStatus] = useState('on-time')

    const viewPast = () => {
        axios.get("http://localhost:3001/staff/flights/past",
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            } else {
                setFlightsList(response.data);
            }
        });
    }

    const viewPresent = () => {
        axios.get("http://localhost:3001/staff/flights/current",
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            } else {
                setFlightsList(response.data);
            }
        });
    }

    const viewFuture = () => {
        axios.get("http://localhost:3001/staff/flights/future",
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            } else {
                setFlightsList(response.data);
            }
        });
    }
    
    const viewDefault = () => {
        axios.get("http://localhost:3001/staff/flights",
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            } else {
                setFlightsList(response.data);
            }
        });
    }

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
            <h1 onClick={() => { viewDefault() }} className='w-42 hover:cursor-pointer hover:text-sky-300 text-center mb-6 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Upcoming flights</h1>
            <div className='mt-10 text-center text-3xl space-x-5' >
                <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewPresent() }}>Today's Flights</button>
                <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewPast() }}>Past Flights</button>
                <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewFuture() }}>Future Flights</button>
            </div>

            <div onChange={event => {setSearchField(event.target.value)}} className='ml-4 mt-16 text-gray text-4xl grid gap-80 grid-cols-2'>
                <input className='mr-40 border border-slate-400 rounded-2xl px-4 py-4' onChange={event => {setSearchTerm(event.target.value)}} type="text" placeholder='Search...' />
            </div>  
            <div className='ml-4 mr-4 mt-4 grid gap-4 grid-cols-5 text-2xl'>
                {flightsList.filter((val) => {
                    if (searchTerm === ""){
                        return val
                    } else if (([val.flight_num, val.departure_date, val.departure_time, val.departure_airport, val.arrival_airport, val.arrival_date, val.arrival_time, val.airline_name].join(',').toLowerCase()).includes(searchTerm)){
                        return val
                    }
                }).map((val) => {
                    return (
                        <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                            <h1 onClick={() => { history(`/flight/${val.flight_num}/${val.departure_date}/${val.departure_time}`) }} className='w-42 underline mb-2 text-4xl font-black tracking-tight hover:underline hover:cursor-pointer hover:text-blue-400 text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {val.arrival_date} | {val.arrival_time} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.departure_airport} → {val.arrival_airport} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.airplane_ID} | {val.airline_name} </p>
                            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()}</p>
                            
                            <select onChange={(e) => {setStatus(e.target.value)}} className='inline-flex items-center px-3 py-2 text-xl text-white bg-slate-400 rounded-lg hover:bg-slate-500 dark:focus:ring-blue-800'>
                                <option>on-time</option>
                                <option>delayed</option>
                            </select>
                            <button onClick={() => {update(val.flight_num, val.departure_date, val.departure_time)}} className='ml-2 inline-flex items-center px-3 py-2 text-xl text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>Update</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
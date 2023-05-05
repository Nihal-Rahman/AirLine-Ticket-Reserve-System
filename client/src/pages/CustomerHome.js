import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerNavbar from '../components/CustomerNavbar'
import { useNavigate } from 'react-router-dom';


function CustomerHome() {
  let history = useNavigate();

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
        history("/")
      } else {
        setListOfFlights(response.data);
      }
    });
  }, []);

  const viewPast = () => {
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

  const viewPresent = () => {
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

  const viewFuture = () => {
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
      <CustomerNavbar />
      <div className='mt-40 text-center text-3xl space-x-5' >
        <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewPresent() }}>Today's Flights</button>
        <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewPast() }}>Past Flights</button>
        <button className='ml-2 px-8 py-4 inline-flex items-center text-4xl text-center text-white bg-teal-400 rounded-full hover:bg-teal-800 focus:underline focus:ring-[10px] focus:bg-teal-600 focus:outline-none focus:ring-slate-400 dark:focus:ring-blue-800' onClick={() => { viewFuture() }}>Future Flights</button>
      </div>
      <div>
        <div className='ml-4 mt-10 mr-4 grid gap-4 grid-cols-5 text-xl'>
          {listOfFlights.map((val) => {
            return (
              <div className='p-6 space-y-3 text-2xl bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                <h1 className='w-42 mb-6 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                <p className='font-normal text-gray-700 dark:text-gray-400'>Date: {val.departure_date}</p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>Time: {val.departure_time}</p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>{val.airline_name} </p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()} </p>
                <p className='font-normal text-gray-700 dark:text-gray-400'>Ticket No. {val.ticket_ID} </p>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default CustomerHome
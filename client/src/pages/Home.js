import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Navbar from '../components/Navbar'

function SearchFlights() {
  let history = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/staff/navbar", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    }).then((response) => {
      const user = response.data
      if (user == "customer") {
        history('/customer/home')
      } else if (user == "staff") {
        history('/staff/home')
      }
    })
  }, [])

  const [listOfTickets, setListOfTickets] = useState([]);

  let initialValues = {
    diar: "",
    aair: "",
    ddate: "",
    cexdate: "",
    cnum: "",
    ctype: "",
    name: ""
  }

  const validationSchema = Yup.object().shape({
    dair: Yup.string().required("You must input a destination airport!"),
    aair: Yup.string().required("You must input an arrival airport!"),
    ddate: Yup.string().required("You must a departure date!"),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/customer/home", data, {}).then((response) => {
      if (response.data.error) {
        console.log(response.data.error)
      }
      else {
        console.log(response.data);
        let tickets = response.data;
        tickets.map((data, key) => {
          return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key] }
        })
        setListOfTickets(tickets);
      }
    })
  };


  return (
    <section>
      <>
        <Navbar />
        <div className='text-center mt-80'>
          <h1 className='text-8xl mb-10 underline decoration-sky-300'>Welcome!</h1>
          <h1 className='text-3xl mb-4 underline decoration-violet-300'>Find flights now!</h1>
        </div>

        <div className='searchFlights'>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='searchContainer'>
              <label className='text-4xl'>Departure Airport:</label>
              <ErrorMessage name="dair" component="span" />
              <Field autoComplete="off" id="inputRegister" name="dair" placeholder="(Ex: JFK)" />
              <label className='text-4xl'>Arrival Airport:</label>
              <ErrorMessage name="aair" component="span" />
              <Field autoComplete="off" id="inputRegister" name="aair" placeholder="(Ex: PVG)" />
              <label className='text-4xl'>Departure Date:</label>
              <ErrorMessage name="ddate" component="span" />
              <Field autoComplete="off" id="inputRegister" name="ddate" placeholder="(Ex: YYYY-MM-DD)" />
              <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Search </button>
            </Form>
          </Formik>
        </div>
        <h1 className='w-42 mt-20 mb-6 text-5xl text-center font-black underline tracking-tight text-gray-900 dark:text-white'>Available Tickets</h1>
        <div>
          <div className='ml-4 mr-4 grid gap-4 grid-cols-4 text-xl'>
            {listOfTickets.map((value, key) => {
              return (
                <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-2xl hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
                  <h1 className='w-42 mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Ticket No. {value.ticket_ID}</h1>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Flight {value.flight_num} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Date: {value.departure_date} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Time: {value.departure_time} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{value.airline_name}</p>
                </div>
              )
            })}
          </div>
        </div>

      </>
    </section>


  );
}

export default SearchFlights
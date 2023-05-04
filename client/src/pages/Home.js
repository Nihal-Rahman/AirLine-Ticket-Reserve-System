import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

function Home() {
  const [status, setStatus] = useState("Round Trip")

  const [goingFlights, setgoingFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  let history = useNavigate();

  let initialValues = {
    diar: "",
    aair: "",
    ddate: "",
    rdate: "",
    roundone: "Round Trip",
    cexdate: "",
    cnum: "",
    ctype: "",
    name: ""
  }

  const validationSchema = Yup.object().shape({
    dair: Yup.string().required("You must input a destination airport!"),
    aair: Yup.string().required("You must input an arrival airport!"),
    ddate: Yup.string().required("You must input a departure date!"),
    rdate: Yup.string().required("You must input a return date!"),
  })


  const onSubmit = (data) => {
    data.roundone = status
    axios.post("http://localhost:3001/customer/homeSearch", data).then((response) => {

      if (response.data.error) {
        alert("You are not logged in!");
      }
      else {
        if (status == "One Way") {
          setgoingFlights(response.data.tickets);
        }
        else {
          let set1 = response.data.departure1;
          let set2 = response.data.departure2;

          setgoingFlights([...set1]);
          setReturnFlights([...set2]);
        }
      }
    })
  };

  return (
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
                <section>{status == "One Way" ? (<></>) : (<>
                  <label className='text-4xl'>Return Date:</label>
                  <br />
                  <ErrorMessage name="rdate" component="span" />
                  <Field className='returnDate2' autoComplete="off" id="inputRegister" name="rdate" placeholder="(Ex: YYYY-MM-DD)" />
                </>)}</section>

                <select onChange={(e) => { setStatus(e.target.value) }} className='inline-flex items-center mt-5 px-3 py-2 text-center border border-slate-300 text-4xl rounded-lg'>
                  <option>Round Trip</option>
                  <option>One Way</option>
                </select>

                <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Search </button>
              </Form>
            </Formik>
          </div>

          
          <h1 className='w-42 mt-20 mb-6 text-5xl text-center font-black underline tracking-tight text-gray-900 dark:text-white'>Upcoming Flights</h1>

          <section>{status == "One Way" ? (<>
          <h1 className='text-4xl mt-20 mb-4 ml-10'>Outgoing:</h1>
          <div className='mb-20 ml-10 mr-4 grid gap-4 grid-cols-4 text-xl'>
            {goingFlights.map((val, key) => {
              return (
                    <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                      <h1 className='w-42 underline mb-2 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {val.arrival_date} | {val.arrival_time} </p>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.departure_airport} → {val.arrival_airport} </p>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.airplane_ID} | {val.airline_name} </p>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()}</p>
                    </div>

              )
            })}
            </div>
          </>) : (<>
          <h1 className='text-4xl mt-20 mb-4 ml-10'>Outgoing:</h1>
          <div className='mb-10 ml-10 mr-4 grid gap-4 grid-cols-4 text-xl'>
            {goingFlights.map((val, key) => {
              return (
                <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                  <h1 className='w-42 underline mb-2 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {val.arrival_date} | {val.arrival_time} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.departure_airport} → {val.arrival_airport} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.airplane_ID} | {val.airline_name} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()}</p>
                </div>

              )
            })}
          </div>
          
          <h1 className='text-4xl mb-4 ml-10'>Returning:</h1>
          <div className='mb-20 ml-10 mr-4 grid gap-4 grid-cols-4 text-xl'>
            {returnFlights.map((val, key) => {
              return (
                <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                  <h1 className='w-42 underline mb-2 text-4xl font-black tracking-tight underline text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {val.arrival_date} | {val.arrival_time} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.departure_airport} → {val.arrival_airport} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{val.airplane_ID} | {val.airline_name} </p>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {val.flight_status.toUpperCase()}</p>
                </div>

              )
            })}
          </div>
          </>)}
          </section>
        </>
  );
}

export default Home
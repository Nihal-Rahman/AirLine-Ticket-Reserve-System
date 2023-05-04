import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

function Home() {
  const [status, setStatus] = useState("Round Trip")

  const [listOfTickets, setListOfTickets] = useState([]);

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
          let tickets = response.data.tickets;
          tickets.map((data, key) => {
            return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key] }
          })
          setListOfTickets(tickets);
        }
        else {
          let set1 = response.data.departure1;
          let set2 = response.data.departure2;


          const s1 = set1.map((data, key) => {
            return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key] }
          });

          const s2 = set2.map((data, key) => {
            return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key] }
          });

          setListOfTickets([...s1, ...s2]);
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
                    <input className='hover:cursor-pointer' onChange={(event) => {
                      let checked = event.target.checked;
                      setListOfTickets(
                        listOfTickets.map(data => {
                          if (data.ticket_ID === value.ticket_ID) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }} style={{ transform: "scale(2)" }} type="checkbox" checked={value.select} />
                  </div>
                )
              })}
            </div>
          </div>

        </>
  );
}

export default Home
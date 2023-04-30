import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react"; 

function SearchFlights(){

    const initialValues = {
        diar: "",
        aair: "",
        ddate: "",
        cexdate: "",
        cnum: "",
        ctype: "",
        name:""

    }

    const [listOfTickets, setListOfTickets] = useState([]);
    const [ticketsToBuy, setTicketsToBuy] = useState([]);
    const [readytoPurchase, setReadyToPurchase] = useState(false);

    const validationSchema = Yup.object().shape({
        dair: Yup.string().required("You must input a destination airport!"),
        aair: Yup.string().required("You must input an arrival airport!"),
        ddate: Yup.string().required("You must a departure date!"),
        cexdate: Yup.string().required("You must input an expiration date"),
        name: Yup.string().required("You must input a name"),
        ctype: Yup.string().required("You must input a card type"),
        cnum: Yup.string().required("You must input a card number")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/customer/search", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then( (response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            }
            else{
                console.log(response.data);
                let tickets = response.data;
                tickets.map((data) => {
                    return {select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time:data.departure_time, airline_name: data.airline_name}
                })
                setListOfTickets(tickets);
            }
        })
    };

    const purchaseTickets = () => {
        const wantToBuy = listOfTickets.map((data)=>{
            if(data.select){
                return data;
            }
        }).filter(a => a != null);

        setTicketsToBuy(wantToBuy);
        setReadyToPurchase(true);
    };

    const finalPurchase = () => {};



    return(
    <section>
    {!readytoPurchase ? (
            <>
                <div className='registerPage'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form className='formContainer'>
                        <label>Departure Airport:</label>
                        <ErrorMessage name="dair" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="dair" placeholder="(Ex: JFK)" />
                        <label>Arrival Airport:</label>
                        <ErrorMessage name="aair" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="aair" placeholder="(Ex: PVG)" />
                        <label>Departure Date:</label>
                        <ErrorMessage name="ddate" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="ddate" placeholder="(Ex: DD-MM-YYYY)" />
                        <button type='submit'>Search </button>
                    </Form>
                    </Formik>
                </div>

                <table className="Tickettable">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Flight Num</th>
                            <th>Departure Date</th>
                            <th>Departure Time</th>
                            <th>Airline Name</th>
                            <th>Buy?</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listOfTickets.map((value,key) => {
                        return ( 
                        <tr> 
                            <td> {value.ticket_ID} </td> 
                            <td> {value.flight_num} </td> 
                            <td> {value.departure_date} </td> 
                            <td> {value.departure_time} </td>
                            <td> {value.airline_name} </td>
                            <td>
                                <input onChange = {(event)=>{
                                let checked = event.target.checked;
                                setListOfTickets(
                                    listOfTickets.map(data => {
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
                <button onClick={purchaseTickets}> Submit </button>
            </>
        ): (
            <>
                <div className='registerPage'>
                    <Formik initialValues={initialValues} onSubmit={finalPurchase} validationSchema={validationSchema}>
                    <Form className='formContainer'>
                        <label>Card Type:</label>
                        <ErrorMessage name="ctype" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="ctype" placeholder="(Ex: Credit or Debit)" />
                        <label>Card Number:</label>
                        <ErrorMessage name="cnum" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="cnum" placeholder="(Ex: 123456789" />
                        <label>Card Expiration:</label>
                        <ErrorMessage name="cexdate" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="cexdate" placeholder="(Ex: DD-MM-YYYY)" />
                        <label>Name on Card:</label>
                        <ErrorMessage name="name" component="span" />
                        <Field autoComplete="off" id="inputRegister" name="cexdate" placeholder="(Ex: John Doe)" />
                        <button type='submit'>Pay! </button>
                    </Form>
                    </Formik>
                </div>
            </>
        )}
        </section>
      
      
    );
}

export default SearchFlights
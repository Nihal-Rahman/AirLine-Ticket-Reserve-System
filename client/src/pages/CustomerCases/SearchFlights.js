import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useEffect, useState } from "react"; 
import CustomerPayment from './CustomerPayment';
import CustomerTicketInfo from './CustomerTicketInfos';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/CustomerNavbar'

function SearchFlights(){
    const [status, setStatus] = useState("Round Trip")

    const [listOfTickets, setListOfTickets] = useState([]);
    const [returnTickets, setReturnTickets] = useState([]);


    const [ticketsToBuy, setTicketsToBuy] = useState([]);
    const [readytoPurchase, setReadyToPurchase] = useState(false);
    const [page, setPage] = useState(0);
    const [cexdate, setCexdate] = useState("");
    const [cnum, setCnum] = useState("");
    const [name, setName] = useState("");
    const [ctype, setCtype] = useState("");

    let history = useNavigate();

    let initialValues = {
        diar: "",
        aair: "",
        ddate: "",
        rdate: "",
        roundone:"Round Trip",
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

    const validationSchema2 = Yup.object().shape({
        cexdate: Yup.string().required("You must input an expiration date"),
        name: Yup.string().required("You must input a name"),
        ctype: Yup.string().required("You must input a card type"),
        cnum: Yup.string().required("You must input a card number")
    })


    const onSubmit = (data) => {
        data.roundone = status
        axios.post("http://localhost:3001/customer/search", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {

            if (response.data.error) {
                alert("You are not logged in!");
            }
            else {


                



                if (status == "One Way") {
                    let tickets = response.data.tickets;
                    tickets.map((data, key) => {
                        return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key], price: data.price }
                    })
                    setListOfTickets(tickets);
                }
                else {
                    let set1 = response.data.departure1;
                    let set2 = response.data.departure2;


                    const s1 = set1.map((data, key) => {
                        return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key], price: data.price  }
                    });

                    const s2 = set2.map((data, key) => {
                        return { select: false, ticket_ID: data.ticket_ID, flight_num: data.flight_num, departure_date: data.departure_date, departure_time: data.departure_time, airline_name: data.airline_name, firstName: data["firstName" + key], lastName: data["lastName" + key], price: data.price  }
                    });

                    setListOfTickets([...s1]);
                    setReturnTickets([...s2]);
                }
            }
        })
    };




    const purchaseTickets = () => {
        let wantToBuy = listOfTickets.map((data)=>{
            if(data.select){
                return data;
            }
        }).filter(a => a != null);

        wantToBuy = [...wantToBuy, ...returnTickets.map((data) => {
            if (data.select) {
                return data;
            }
        }).filter(a => a != null)];


        wantToBuy.map((data, key)=>{
            initialValues["firstName" + key] = "";
            initialValues["lastName" + key] = "";
            initialValues["date_of_birth" + key] = "";
        })


        setTicketsToBuy(wantToBuy);
        setReadyToPurchase(true);
    };

    const submitPaymentInfo = (data) => {
        setCexdate(data.cexdate);
        setCnum(data.cnum);
        setCtype(data.ctype);
        setName(data.name);

        setPage(1);
    };

    const final = (data) => {
        const ticket_bought = ticketsToBuy.map((d,key) =>{
            return {price: d.price, ticket_ID: d.ticket_ID, firstName: data["firstName"+key], lastName: data["lastName"+key], dob: data["dob"+key], card_type: ctype, card_num: cnum, name_on_card: name, expiration_date: cexdate}
        });

        axios.post("http://localhost:3001/customer/buy", ticket_bought, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
                if (response.data.error) {
                    alert("You are not logged in!");
                }
                console.log("succesful purchase");
                history("/customer/home");
            })
       
    }

    const FormDisplay = ()=>{
        if(page === 0 ){
            return <CustomerPayment initialValues={initialValues} onSubmit={submitPaymentInfo} validationSchema={validationSchema2} />;
        }
        if(page === 1){
            return <CustomerTicketInfo initialValues={initialValues} onSubmit={final} data={ticketsToBuy}/>
        }
    }


    return(
    <div>
        <CustomerNavbar />
        <section>
        {!readytoPurchase ? (
                <>
                    <div className='searchFlights'>
                            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className='formContainer'>
                                    <label className='text-4xl'>Departure Airport:</label>
                                    <ErrorMessage name="dair" component="span" />
                                    <Field autoComplete="off" id="inputRegister" name="dair" placeholder="(Ex: JFK)" />
                                    <label className='text-4xl'>Arrival Airport:</label>
                                    <ErrorMessage name="aair" component="span" />
                                    <Field autoComplete="off" id="inputRegister" name="aair" placeholder="(Ex: PVG)" />
                                    <label className='text-4xl'>Departure Date:</label>
                                    <ErrorMessage name="ddate" component="span" />
                                    <Field autoComplete="off" id="inputRegister" name="ddate" placeholder="(Ex: YYYY-MM-DD)" />
                                    <section>{status == "One Way" ? (<></>): (<>
                                        <label className='text-4xl'>Return Date:</label>
                                        <br/>
                                        <ErrorMessage name="rdate" component="span" />
                                        <Field className='returnDate' autoComplete="off" id="inputRegister" name="rdate" placeholder="(Ex: YYYY-MM-DD)" />
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
                    <button className='mt-10 ml-4 flex flex-col items-center mb-10 px-8 py-8 text-2xl text-center text-white bg-blue-400 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' onClick={purchaseTickets}> Checkout </button>
                            <section>{status == "One Way" ? (<>
                                <h1 className='text-4xl mt-20 mb-4 ml-10'>Outgoing:</h1>
                                < div className='mb-20 ml-4 mr-4 grid gap-4 grid-cols-4 text-xl' >
                                    {
                                        listOfTickets.map((value, key) => {
                                            return (
                                                <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-2xl hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
                                                    <h1 className='w-42 mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Ticket No. {value.ticket_ID}</h1>
                                                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Flight {value.flight_num} </p>
                                                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Date: {value.departure_date} </p>
                                                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Time: {value.departure_time} </p>
                                                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{value.airline_name}</p>
                                                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Price: ${value.price}</p>
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
                                        })
                                    }
                                </div >
                            </>) : (<>
                                <h1 className='text-4xl mt-20 mb-4 ml-10'>Outgoing:</h1>
                                    < div className='mb-20 ml-4 mr-4 grid gap-4 grid-cols-4 text-xl' >
                                        {
                                            listOfTickets.map((value, key) => {
                                                return (
                                                    <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-2xl hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
                                                        <h1 className='w-42 mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Ticket No. {value.ticket_ID}</h1>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Flight {value.flight_num} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Date: {value.departure_date} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Time: {value.departure_time} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{value.airline_name}</p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Price: ${value.price}</p>

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
                                            })
                                        }
                                    </div >

                                <h1 className='text-4xl mb-4 ml-10'>Returning:</h1>
                                    < div className='mb-20 ml-4 mr-4 grid gap-4 grid-cols-4 text-xl' >
                                        {
                                            returnTickets.map((value, key) => {
                                                return (
                                                    <div className='max-w-xl p-6 bg-white border border-slate-300 rounded-lg hover:shadow-2xl hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700'>
                                                        <h1 className='w-42 mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white'>Ticket No. {value.ticket_ID}</h1>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Flight {value.flight_num} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Date: {value.departure_date} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Time: {value.departure_time} </p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{value.airline_name}</p>
                                                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Price: ${value.price}</p>
                                                        <input className='hover:cursor-pointer' onChange={(event) => {
                                                            let checked = event.target.checked;
                                                            setReturnTickets(
                                                                returnTickets.map(data => {
                                                                    if (data.ticket_ID === value.ticket_ID) {
                                                                        data.select = checked;
                                                                    }
                                                                    return data;
                                                                })
                                                            );
                                                        }} style={{ transform: "scale(2)" }} type="checkbox" checked={value.select}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div >
                            </>)}
                            </section>
                    </div>

                </>
            ): (
                <>
                    <div className='registerPage'>
                        {FormDisplay()}
                    </div>
                </>
            )}
            </section>
        </div>
      
      
    );
}

export default SearchFlights
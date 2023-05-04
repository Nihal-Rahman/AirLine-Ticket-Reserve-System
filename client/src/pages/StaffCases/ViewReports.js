import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import StaffNavbar from '../../components/StaffNavbar'

function ViewReports() {
    const [ticketsSoldRevenue, setTicketsSoldRevenue] = useState([]);
    const [searchDates, setSearchDates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/staff/ticketSoldRevenue",
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }
        ).then((response) => {
            const month = response.data.monthly;
            const year = response.data.yearly;


            const m = month.map((data) => {
                return { type: "Monthly Report", totalTickets: data['COUNT(ticket_ID)'], totalRevenue: data['SUM(price)'] };
            })[0];

            const y = year.map((data) => {
                return { type: "Yearly", totalTickets: data['COUNT(ticket_ID)'], totalRevenue: data['SUM(price)'] };
            })[0];



            setTicketsSoldRevenue([m, y]);


        })
    });

    let initialValues = {
        bdate: "",
        edate: "",
    }

    const validationSchema = Yup.object().shape({
        bdate: Yup.string().required("You must input a beginning range date!"),
        edate: Yup.string().required("You must input an end range date!"),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/staff/ticketDateRange", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!");
            }
            else {
                setSearchDates(response.data);
            }
        })
    }

    return (
        <div className="searchFlights">
            <StaffNavbar/>
            <section>
                <div className=" text-6xl">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="underline">Type of Report</th>
                                <th className="underline">Number of Tickets Sold</th>
                                <th className="underline">Total Revenue</th>
                            </tr>
                        </thead>
                        <br/>
                        <tbody>
                            {ticketsSoldRevenue.map((value, key) => {
                                return (
                                    <tr>
                                        <td>{value.type}</td>
                                        <td> {value.totalTickets} </td>
                                        <td> {value.totalRevenue != null ? value.totalRevenue : 0} </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
                
                <div classname='searchReports'>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className='formContainer'>
                            <label className="text-4xl">Begin Date:</label>
                            <ErrorMessage name="bdate" component="span" />
                            <Field autoComplete="off" id="inputRegister" name="bdate" placeholder="(Ex: YYYY-MM-DD)" />
                            <br/>
                            <label className="text-4xl">End Date:</label>
                            <ErrorMessage name="edate" component="span" />
                            <Field autoComplete="off" id="inputRegister" name="edate" placeholder="(Ex: YYYY-MM-DD)" />
                            <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Search </button>
                        </Form>
                    </Formik>
                </div>

                <div className="ml-52 text-6xl">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="underline">Date</th>
                                <th className="underline">Number of Tickets Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchDates.map((value, key) => {
                                return (
                                    <tr>
                                        <td>{value['purchase_date']}</td>
                                        <td> {value['COUNT(purchase_date)'] != null ? value['COUNT(purchase_date)'] : 0} </td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

    )
}

export default ViewReports
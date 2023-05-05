import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navbar from "../../components/Navbar";

function CustomerTicketInfo({initialValues,onSubmit, validation, data}){
    return(
        <div className="">
            <div className="buyFlights">
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className='formContainer'>
                        {data.map((value, key)=>{
                            return(
                                <>
                                    <label className=' underline text-4xl mb-4'><b>Passenger Info for Ticket #{key + 1}</b></label>
                                    <label className='italic text-2xl mb-10'><b>Flight #{value.flight_num} | {value.departure_date} | Ticket No. {value.ticket_ID}</b></label>
                                    <label className='text-4xl'>First Name:</label>
                                    <ErrorMessage name={"firstName"+key} component="span" />
                                    <Field required autoComplete="off" id="inputRegister" name={"firstName"+ key} placeholder="(Ex: John)" />
                                    <label className='text-4xl'>Last Name:</label>
                                    <ErrorMessage name={"lastName"+key} component="span" />
                                    <Field required autoComplete="off" id="inputRegister" name={"lastName"+key}  placeholder="(Ex: Doe)" />
                                    <label className='text-4xl'>Date of Birth:</label>
                                    <ErrorMessage name={"dob"+key}  component="span" />
                                    <Field required autoComplete="off" id="inputRegister" name={"dob" + key} placeholder="(Ex: YYYY-MM-DD)" />
                                </>
                            )
                        })}
                <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Submit </button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default CustomerTicketInfo
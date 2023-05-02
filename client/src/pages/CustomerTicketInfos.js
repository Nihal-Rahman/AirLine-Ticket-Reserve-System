import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CustomerTicketInfo({initialValues,onSubmit, validation, data}){
    return(
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className='formContainer'>
                        {data.map((value, key)=>{
                            return(
                                <>
                                    <label>Ticket#{key} Info</label>
                                    <label>First Name:</label>
                                    <ErrorMessage name={"firstName"+key} component="span" />
                                    <Field autoComplete="off" id="inputRegister" name={"firstName"+ key} placeholder="(Ex: John)" />
                                    <label>Last Name:</label>
                                    <ErrorMessage name={"lastName"+key} component="span" />
                                    <Field autoComplete="off" id="inputRegister" name={"lastName"+key}  placeholder="(Ex: Doe)" />
                                    <label>Date of Birth:</label>
                                    <ErrorMessage name={"dob"+key}  component="span" />
                                    <Field autoComplete="off" id="inputRegister" name={"dob"+key}  placeholder="(Ex: DD-MM-YYYY)" />
                                </>
                            )
                        })}
                        <button type='submit'>Submit</button>
                    </Form>
                </Formik>
    )
}

export default CustomerTicketInfo
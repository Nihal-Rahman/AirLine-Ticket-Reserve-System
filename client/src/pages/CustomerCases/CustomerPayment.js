import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomerNavbar from "../../components/CustomerNavbar";

function CustomerPayment({initialValues,onSubmit, validation}){
    return(
        <div>          
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
                <Form className='formContainer'>            
                    <label>Card Type:</label>
                    <ErrorMessage name="ctype" component="span" />
                    <Field required autoComplete="off" id="inputRegister" name="ctype" placeholder="(Ex: Credit or Debit)" />
                    <label>Card Number:</label>
                    <ErrorMessage name="cnum" component="span" />
                    <Field required autoComplete="off" id="inputRegister" name="cnum" placeholder="(Ex: 123456789" />
                    <label>Card Expiration:</label>
                    <ErrorMessage name="cexdate" component="span" />
                    <Field required autoComplete="off" id="inputRegister" name="cexdate" placeholder="(Ex: YYYY-MM-DD)" />
                    <label>Name on Card:</label>
                    <ErrorMessage name="name" component="span" />
                    <Field required autoComplete="off" id="inputRegister" name="name" placeholder="(Ex: John Doe)" />
                    <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Next</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CustomerPayment
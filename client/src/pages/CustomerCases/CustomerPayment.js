import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CustomerPayment({initialValues,onSubmit, validation}){
    return(
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
            <Form className='formContainer'>
                <label>Card Type:</label>
                <ErrorMessage name="ctype" component="span" />
                <Field autoComplete="off" id="inputRegister" name="ctype" placeholder="(Ex: Credit or Debit)" />
                <label>Card Number:</label>
                <ErrorMessage name="cnum" component="span" />
                <Field autoComplete="off" id="inputRegister" name="cnum" placeholder="(Ex: 123456789)" />
                <label>Card Expiration:</label>
                <ErrorMessage name="cexdate" component="span" />
                <Field autoComplete="off" id="inputRegister" name="cexdate" placeholder="(Ex: DD-MM-YYYY)" />
                <label>Name on Card:</label>
                <ErrorMessage name="name" component="span" />
                <Field autoComplete="off" id="inputRegister" name="name" placeholder="(Ex: John Doe)" />
                <button type='submit'>Next</button>
            </Form>
        </Formik>
    )
}

export default CustomerPayment
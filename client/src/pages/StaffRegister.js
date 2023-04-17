import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function StaffRegister() {

    const initialValues = {
        username: "",
        pass: "",
        email: "",
        first: "",
        last: "",
        dob: "",
        airline: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required field."),
        pass: Yup.string().required("Required field."),
        email: Yup.string().required("Required field."),
        first: Yup.string().required("Required field."),
        last: Yup.string().required("Required field."),
        dob: Yup.string().required("Required field (MM-DD-YYYY)."),
        airline: Yup.string().required("Required field."),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/staffregister", data).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>First Name</label>
                    <ErrorMessage name="first" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="first" />
                    <br />

                    <label>Last Name</label>
                    <ErrorMessage name="last" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="last" />
                    <br />

                    <label >Username</label>
                    <ErrorMessage name="username" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="username" />
                    <br/>

                    <label>Password</label>
                    <ErrorMessage name="pass" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="pass" type="password"/>
                    <br />

                    <label>Email Address</label>
                    <ErrorMessage name="email" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="email"/>
                    <br />

                    <label>Date of Birth</label>
                    <ErrorMessage name="dob" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="dob" />
                    <br />
                    
                    <label>Airline</label>
                    <ErrorMessage name="airline" component="span" />
                    <Field autoComplete="off" id="inputRegister" name="airline" />
                    <br />

                    <button type='submit'>Register </button>
                </Form>
            </Formik>
        </div>
    )
}

export default StaffRegister
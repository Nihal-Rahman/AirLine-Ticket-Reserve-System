import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

function StaffRegister() {

    const initialValues = {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        airline: "",
        phoneNum: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required field."),
        password: Yup.string().required("Required field."),
        email: Yup.string().required("Required field."),
        firstName: Yup.string().required("Required field."),
        lastName: Yup.string().required("Required field."),
        dob: Yup.string().required("Required field (MM-DD-YYYY)."),
        airline: Yup.string().required("Required field."),
        phoneNum: Yup.string().required("Required field."),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/Staffs", data).then((response) => {
            console.log(response.data);
        });
        toast.success("You have been registered!")
    };

    return (
        <div mt-32 className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <ErrorMessage name="firstName" component="span" />
                    <Field placeholder='First Name' autoComplete="off" id="inputRegister" name="firstName" />
                    <br />

                    <ErrorMessage name="lastName" component="span" />
                    <Field placeholder='Last Name' autoComplete="off" id="inputRegister" name="lastName" />
                    <br />

                    <ErrorMessage name="username" component="span" />
                    <Field placeholder='Username' autoComplete="off" id="inputRegister" name="username" />
                    <br />

                    <ErrorMessage name="password" component="span" />
                    <Field placeholder='Password' autoComplete="off" id="inputRegister" name="password" type="password" />
                    <br />

                    <ErrorMessage name="email" component="span" />
                    <Field placeholder='Email Address' autoComplete="off" id="inputRegister" name="email" />
                    <br />

                    <ErrorMessage name="dob" component="span" />
                    <Field placeholder='Date of Birth' autoComplete="off" id="inputRegister" name="dob" />
                    <br />

                    <ErrorMessage name="airline" component="span" />
                    <Field placeholder='Airline Name' autoComplete="off" id="inputRegister" name="airline" />
                    <br />

                    <ErrorMessage name="phoneNum" component="span" />
                    <Field placeholder='Phone Number' autoComplete="off" id="inputRegister" name="phoneNum" />
                    <br />

                    <button type='submit' className='button'>Register</button>
                    <ToastContainer />
                </Form>
            </Formik>
        </div>
    )
}

export default StaffRegister
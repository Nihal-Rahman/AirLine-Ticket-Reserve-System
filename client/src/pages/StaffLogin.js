import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

function StaffLogin() {
    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required field."),
        password: Yup.string().required("Required field.")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/Staffs/login", data).then((response) => {
            console.log(response.data);
        });
    };

    return (
        <div className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <ErrorMessage name="username" component="span" />
                    <Field placeholder='username' autoComplete="off" id="inputLogin" name="username" />
                    <br />

                    <ErrorMessage name="password" component="span" />
                    <Field placeholder='password' autoComplete="off" id="inputLogin" name="password" type="password" />

                    <button type='submit' className='button'>Login</button>
                    <ToastContainer />
                </Form>
            </Formik>
        </div>
    )
}

export default StaffLogin
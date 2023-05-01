import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function StaffLogin() {
    const initialValues = {
        username: "",
        password: ""
    }

    let history = useNavigate();


    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required field."),
        password: Yup.string().required("Required field.")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/login/staff", data).then((response) => {
            if (response.data.error) {
                console.log("Here's the error: " + response.data.error)
                alert(response.data.error);
            }
            else {
                sessionStorage.setItem("accessToken", response.data);
                history("/staff/home");
            }
        });
    };

    return (
        <div className='registerPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label className='font-extrabold underline text-2xl'>Staff Login</label>
                    <br />
                    <ErrorMessage name="username" component="span" />
                    <Field placeholder='Username' autoComplete="off" id="inputLogin" name="username" />
                    <br />

                    <ErrorMessage name="password" component="span" />
                    <Field placeholder='Password' autoComplete="off" id="inputLogin" name="password" type="password" />

                    <button type='submit' className='button'>Login</button>
                    <br />
                    <a className='redirect' href='/user/login'>Not a staff member? Login here.</a>
                    <ToastContainer />
                </Form>
            </Formik>
        </div>
    )
}

export default StaffLogin
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


function StaffRegister() {

    let history = useNavigate();


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
        username: Yup.string().required("Required "),
        password: Yup.string().required("Required "),
        email: Yup.string().required("Required "),
        firstName: Yup.string().required("Required "),
        lastName: Yup.string().required("Required "),
        dob: Yup.string().required("Required "),
        airline: Yup.string().required("Required "),
        phoneNum: Yup.string().required("Required "),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/register/staff", data).then((response) => {
            if (response.data.error) {
                console.log("Here's the error: " + response.data.error)
                alert(response.data.error);
            }
            else {
                toast.success("You have been registered!")
                sessionStorage.setItem("accessToken", response.data);
                history("/staff/login");
            }
        });
        
    };

    return (
        <div className='registerPage'>
            <Navbar/>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer2'>
                    <label className='font-extrabold underline mb-10 text-4xl'>Staff Registration</label>

                    <div className="row">
                        <div className='column2'>
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
                        </div>
                        
                        <div className='column2'>
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
                        </div>

                    </div>

                    <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Register </button>
                    <br />
                    <a className='redirect' href='/user/register'>Not a staff member? Register here.</a>
                    <ToastContainer />
                </Form>
            </Formik>
        </div> 
    )
}

export default StaffRegister
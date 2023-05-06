import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {

  const initialValues = {
    email: "",
    pass: "",
  }

  let history = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("You must input a email!"),
    pass: Yup.string().required("You must input a passcode!"),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/login", data).then((response) => {
      if(response.data.error){
        alert(response.data.error);
      }
      else{
        console.log(response.data);
        sessionStorage.setItem("accessToken", response.data);
        history("/customer/home");
      }
    });

    console.log(data);
  };

  return (
    <div className='registerPage'>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label className='font-extrabold underline mb-10 text-4xl'>Customer Login</label>
          <ErrorMessage name="email" component="span" />
          <Field autoComplete="off" id="inputRegister" name="email" placeholder="Email Address" />
          <ErrorMessage name="pass" component="span" />
          <Field autoComplete="off" id="inputRegister" name="pass" type='password' placeholder='Password'/>
          <button className='px-16 mb-10 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Login</button>
          <a className='redirect' href='/staff/login'>Airline Staff Member? Login here.</a>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
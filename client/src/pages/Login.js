import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
        sessionStorage.setItem("accessToken", response.data);
        history("/customer/home");
      }
      
    });
  };

  return (
    <div className='registerPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label>Email:</label>
          <ErrorMessage name="email" component="span" />
          <Field autoComplete="off" id="inputRegister" name="email" placeholder="(Ex: joeode@nyu.edu)" />
          <label>Password:</label>
          <ErrorMessage name="pass" component="span" />
          <Field autoComplete="off" id="inputRegister" name="pass" />
          <button type='submit'>Login </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
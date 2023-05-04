import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from '../components/Navbar';

function Register() {

  const initialValues = {
    email: "",
    first: "",
    last: "",
    pass: "",
    buildnum: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    passnum: "",
    passcountry: "",
    passexpire: "",
    dob: ""
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required "),
    first: Yup.string().required("Required "),
    last: Yup.string().required("Required "),
    pass: Yup.string().required("Required "),
    buildnum: Yup.string().required("Required "),
    street: Yup.string().required("Required "),
    apt: Yup.string(),
    city: Yup.string().required("Required "),
    state: Yup.string(),
    zip: Yup.string().required("Required "),
    passnum: Yup.string().required("Required "),
    passcountry: Yup.string().required("Required "),
    passexpire: Yup.string().required("Required "),
    dob: Yup.string().required("Required "),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/register", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className='registerPage'>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label className='font-extrabold underline mb-10 text-4xl'>Customer Registration</label>
          <div className="row">
            <div className='column'>
              <h className="underline mb-40">Login Info</h>
              <br/>
              <ErrorMessage name="email" component="span"/>
              <Field autoComplete="off" id="inputRegister" name="email" placeholder="Email Address" />
              <br/>
              <ErrorMessage name="first" component="span" />
              <Field autoComplete="off" placeholder='First Name' id="inputRegister" name="first" />
              <br />
              <ErrorMessage name="last"  component="span" />
              <Field autoComplete="off" placeholder='Last Name' id="inputRegister" name="last" />
              <br />
              <ErrorMessage name="pass" component="span" />
              <Field autoComplete="off" placeholder='Password' type="password" id="inputRegister" name="pass" />
              <br />
            </div>

            <div className='column'>
              <h className="underline">Address</h>
              <br/>
              <ErrorMessage name="buildnum" component="span" />
              <Field className='w-1000' autoComplete="off" placeholder='Building Number' id="inputRegister" name="buildnum" />
              <br />
              <ErrorMessage name="street"  component="span" />
              <Field autoComplete="off" placeholder='Street' id="inputRegister" name="street" />
              <br />
              <ErrorMessage name="apt" component="span" />
              <Field autoComplete="off" placeholder='Apartment No.' id="inputRegister" name="apt" />
              <br />
              <ErrorMessage name="city" component="span" />
              <Field autoComplete="off" placeholder='City' id="inputRegister" name="city" />
              <br />
              <ErrorMessage name="state"  component="span" />
              <Field autoComplete="off" placeholder='State' id="inputRegister" name="state" />
              <br />
              <ErrorMessage name="zip"  component="span" />
              <Field autoComplete="off" placeholder='Zip Code' id="inputRegister" name="zip" />
              <br />
            </div>

            <div className='column'>
              <h className="underline">Passport Info</h>
              <br/>
              <ErrorMessage name="passnum" component="span" />
              <Field autoComplete="off" placeholder='Passport Number' id="inputRegister" name="passnum" />
              <br />
              <ErrorMessage name="passcountry" component="span" />
              <Field autoComplete="off" placeholder='Country' id="inputRegister" name="passcountry" />
              <br />
              <ErrorMessage name="passexpire" component="span" />
              <Field autoComplete="off" placeholder='Expiration Date' id="inputRegister" name="passexpire" />
              <br />
              <ErrorMessage name="dob" component="span" />
              <Field autoComplete="off" placeholder='Date of Birth' id="inputRegister" name="dob" />
              <br />
            </div>

          </div>
          <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Register </button>
          <br />
          <a className='redirect' href='/staff/register'>Airline staff member? Register here.</a>
        </Form>
      </Formik>
    </div>
  )
}

export default Register
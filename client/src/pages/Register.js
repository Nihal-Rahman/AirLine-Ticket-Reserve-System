import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
    email: Yup.string().required("You must input a email!"),
    first: Yup.string().required(),
    last: Yup.string().required(),
    pass: Yup.string().required(),
    buildnum: Yup.string().required(),
    street: Yup.string().required(),
    apt: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
    passnum: Yup.string().required("You must input a passnum!"),
    passcountry: Yup.string().required("You must input a country!"),
    passexpire: Yup.string().required(),
    dob: Yup.string().required(),
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/register", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className='registerPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label className='font-extrabold underline text-2xl'>Customer Registration</label>
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
          <ErrorMessage name="buildnum" component="span" />
          <Field autoComplete="off" placeholder='Building Number' id="inputRegister" name="buildnum" />
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
          <ErrorMessage name="passnum"  component="span" />
          <Field autoComplete="off" placeholder='Passport Number' id="inputRegister" name="passnum" />
          <br />
          <ErrorMessage name="passcountry" component="span" />
          <Field autoComplete="off" placeholder='Passport Country' id="inputRegister" name="passcountry" />
          <br />
          <ErrorMessage name="passexpire" component="span" />
          <Field autoComplete="off" placeholder='Passport Expiration Date' id="inputRegister" name="passexpire" />
          <br />
          <ErrorMessage name="dob" component="span" />
          <Field autoComplete="off" placeholder='Date of Birth' id="inputRegister" name="dob" />
          <br />
          <button type='submit'>Register </button>
          <br />
          <a className='redirect' href='/staff/register'>Airline staff member? Register here.</a>
        </Form>
      </Formik>
    </div>
  )
}

export default Register
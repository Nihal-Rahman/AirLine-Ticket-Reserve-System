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
          <label>Email:</label>
          <ErrorMessage name="email" component="span" />
          <Field autoComplete="off" id="inputRegister" name="email" placeholder="(Ex: joeode@nyu.edu)" />
          <label>FirstName:</label>
          <ErrorMessage name="first" component="span" />
          <Field autoComplete="off" id="inputRegister" name="first" />
          <label>LastName:</label>
          <ErrorMessage name="last" component="span" />
          <Field autoComplete="off" id="inputRegister" name="last" />
          <label>Password:</label>
          <ErrorMessage name="pass" component="span" />
          <Field autoComplete="off" id="inputRegister" name="pass" />
          <label>BuildingNum:</label>
          <ErrorMessage name="buildnum" component="span" />
          <Field autoComplete="off" id="inputRegister" name="buildnum" />
          <label>Street:</label>
          <ErrorMessage name="street" component="span" />
          <Field autoComplete="off" id="inputRegister" name="street" />
          <label>Apt:</label>
          <ErrorMessage name="apt" component="span" />
          <Field autoComplete="off" id="inputRegister" name="apt" />
          <label>City:</label>
          <ErrorMessage name="city" component="span" />
          <Field autoComplete="off" id="inputRegister" name="city" />
          <label>State:</label>
          <ErrorMessage name="state" component="span" />
          <Field autoComplete="off" id="inputRegister" name="state" />
          <label>ZipCode:</label>
          <ErrorMessage name="zip" component="span" />
          <Field autoComplete="off" id="inputRegister" name="zip" />
          <label>PassNum:</label>
          <ErrorMessage name="passnum" component="span" />
          <Field autoComplete="off" id="inputRegister" name="passnum" />
          <label>PassCountry:</label>
          <ErrorMessage name="passcountry" component="span" />
          <Field autoComplete="off" id="inputRegister" name="passcountry" />
          <label>PassExpire</label>
          <ErrorMessage name="passexpire" component="span" />
          <Field autoComplete="off" id="inputRegister" name="passexpire" />
          <label>DOB:</label>
          <ErrorMessage name="dob" component="span" />
          <Field autoComplete="off" id="inputRegister" name="dob" />
          <button type='submit'>Register </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register
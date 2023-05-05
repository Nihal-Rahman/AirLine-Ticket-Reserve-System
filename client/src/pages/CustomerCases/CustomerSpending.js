import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerNavbar from '../../components/CustomerNavbar';
import * as Yup from "yup";
import { Formik, Form, Field} from "formik";
import { ErrorMessage } from 'formik';

function CustomerSpending() {
  const [yearlyTotal, setYearlyTotal] = useState([]);
  let [monthlyPurchases, setMonthlyPurchases] = useState([]);



  useEffect(() => {
    axios.get("http://localhost:3001/customer/retrieveYearlySpending",
      { 
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        console.log("Retrieve Spending Error");
        console.log(response.data.error);
        alert("You are not logged in!");
      } else {
          const yearTotal = response.data;
          console.log(yearTotal)
          const formattedTotal = yearTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
          console.log(formattedTotal);
          setYearlyTotal(formattedTotal);
      }
    });


    axios.get("http://localhost:3001/customer/retrieveSixMonthSpending",
      { 
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        console.log("Retrieve Spending Error");
        console.log(response.data.error);
        alert("You are not logged in!");
      } else {
        console.log(response.data);
        setMonthlyPurchases(response.data);
      }
    });
  }, []);


  const getSpendingOverRange = (data) => {
    axios.get("http://localhost:3001/customer/retrieveSpendingOverRange",
      { params: {data},
        headers: {
          accessToken: sessionStorage.getItem("accessToken")
        }
      }
    ).then((response) => {
      if (response.data.error) {
        console.log("Retrieve Spending Error");
        console.log(response.data.error);
        alert("You are not logged in!");
      } else {
        console.log(response.data);
        setMonthlyPurchases(response.data);
      }
    });
  }


  let initialValues = {
    start: "YYYY-MM-DD",
    end: "YYYY-MM-DD"
  }

  const validationSchema = Yup.object().shape({
    start: Yup.string().required("You must input a start date"),
    end: Yup.string().required("You put input an end date")
  })


  return (
    <div className = "customerSpendingPage">
      <CustomerNavbar />
      <section>
        <h1>Monthly Spending Breakdown</h1>
        <table className = "table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlyPurchases).map(([date, totalSpent]) => {
              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{totalSpent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      
      <br />
      <div className = "totalPurchases">
        <p>Total Spent this Year: {yearlyTotal}</p>
      </div>
      <br />
      <div className = "">
        <Formik initialValues={initialValues} onSubmit={getSpendingOverRange} validationSchema={validationSchema}>
          <Form className = "formContainer">
            <label>Start Date: </label>
            <ErrorMessage name="start" component="span" />
            <Field autoComplete="off" id="inputStartDate" name="start" placeholder="YYYY-MM-DD"/>
            <label>End Date: </label>
            <ErrorMessage name="end" component="span" />
            <Field autoComplete="off" id="inputEndDate" name="end" placeholder="YYYY-MM-DD"/>
            <button type='submit'> Change Dates </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CustomerSpending
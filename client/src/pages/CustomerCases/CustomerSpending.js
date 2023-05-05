import React from 'react'
//import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import axios from "axios";
//import '../../CustomerSpending.css'
import { useEffect, useState } from "react";
import CustomerNavbar from '../../components/CustomerNavbar';
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from 'formik';

function CustomerSpending() {
  const [yearlyTotal, setYearlyTotal] = useState([]);
  //const [sixMonthPurchaseTotals, setSixMonthPurchaseTotals] = useState([]);
  //const [rangePurchaseTotals, setRangePurchaseTotals] = useState([]);
  //const [start, setStartDate] = useState([]);
  //const [end, setEndDate] = useState([]);
  //const [tableStatus, setTableStatus] = useState(0);
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
        console.log("Year total: ", yearTotal)
        const formattedTotal = yearTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
        //setSixMonthPurchaseTotals(response.data);
        setMonthlyPurchases(response.data);
      }
    });
  }, []);


  const getSpendingOverRange = (data) => {
    axios.get("http://localhost:3001/customer/retrieveSpendingOverRange",
      {
        params: { data },
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
        //setRangePurchaseTotals(response.data);
        //setTableStatus(1);
        setMonthlyPurchases(response.data);
      }
    });
  }


  let initialValues = {
    start: "",
    end: ""
  }

  const validationSchema = Yup.object().shape({
    start: Yup.string().required("You must input a start date"),
    end: Yup.string().required("You put input an end date")
  })


  return (
    <div className='text-4xl'>
      <div className="customerSpendingPage">
        <CustomerNavbar />
        <section className='ml-96 text-center'>
          <h1>Monthly Spending Breakdown</h1>
          <table className="table">
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
        <div className="totalPurchases">
          <p className='ml-96'>Total Spent this Year: {yearlyTotal}</p>
        </div>
        <br />
        <div className='searchFlights'>
          <div className="text-center">
            <Formik initialValues={initialValues} onSubmit={getSpendingOverRange} validationSchema={validationSchema}>
              <Form className="formContainer">
                <label className='text-4xl'>Start Date: </label>
                <ErrorMessage name="start" component="span" />
                <Field className='text-3xl' autoComplete="off" id="inputStartDate" name="start" placeholder="YYYY-MM-DD" />
                <br/>
                <label className='text-4xl'>End Date: </label>
                <ErrorMessage name="end" component="span" />
                <Field className='text-3xl' autoComplete="off" id="inputEndDate" name="end" placeholder="YYYY-MM-DD" />
                <button className='px-16 mb-10 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'> Change Dates </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSpending
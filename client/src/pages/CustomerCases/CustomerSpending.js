import React, { PureComponent } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerNavbar from '../../components/CustomerNavbar';

function CustomerSpending() {
  const [yearlyTotal, setYearlyTotal] = useState([]);
  const [sixMonthPurchaseTotals, setSixMonthPurchaseTotals] = useState([]);
  const [rangePurchaseTotals, setRangePurchaseTotals] = useState([]);
  const [start, setStartDate] = useState([]);
  const [end, setEndDate] = useState([]);


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
        console.log(response.data);
        const yearTotal = response.data;
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
        setSixMonthPurchaseTotals(response.data);
      }
    });
  }, []);


  const getSpendingOverRange = (start, end) => {
    axios.get("http://localhost:3001/customer/retrieveSpendingOverRange",
      {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
        start,
        end
      }
    ).then((response) => {
      if (response.data.error) {
        console.log("Retrieve Spending Error");
        console.log(response.data.error);
        alert("You are not logged in!");
      } else {
        console.log(response.data);
        setRangePurchaseTotals(response.data);
      }
    });
  }


  return (
    <div className="text-center text-4xl">
      <CustomerNavbar />
      <section>
        <h1>Monthly Spending Breakdown</h1>
        <table className="text-center mt-40">
          <thead className='text-center'>
            <tr>
              <th>Month</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            { }
          </tbody>
        </table>
      </section>

      <br />
      <div className="totalPurchases">
        <p>Total Spent this Year: {yearlyTotal}</p>
      </div>
      <br />
      <div className='space-y-10 space-x-10'>
        <h3>Change Date Parameters</h3>
        <input type="text" name="start_date" placeholder='Start Date' onChange={(e) => setStartDate(e.target.value)} />
        <input type="text" name="end_date" placeholder='End Date' onChange={(e) => setEndDate(e.target.value)} />
        <br/>
        <button onClick={() => { getSpendingOverRange(start, end) }} className='px-16 mb-10 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Change Dates</button>
      </div>
    </div>
  );
}

export default CustomerSpending
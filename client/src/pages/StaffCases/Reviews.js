// import React, { useEffect, useState } from 'react'
// import axios, { Axios } from 'axios';
// import '../../App.css'
// import { useNavigate } from 'react-router-dom';

// export default function ViewFlights() {
//     const [reviewsList, setReviewssList] = useState([])

//     useEffect(() => {
//         axios.post("http://localhost:3001/staff/reviews", { flight_num, departure_date, departure_time },
//             {
//                 headers: {
//                     accessToken: sessionStorage.getItem("accessToken"),
//                 },
//             }).then((response) => {
//                 if (response.data.error) {
//                     alert("You are not logged in!")
//                 }
//                 else {
//                     setReviewsList(response.data);
//                 }
//             })
//     }, [])

//     return (
//         <div>
//             <div className='ml-4 grid gap-4 grid-cols-4 mt-36 space-y-5 text-2xl'>
//                 {reviewsList.map((val) => {
//                     return (
//                         <div className='max-w-xl p-6 bg-white border border-gray-200 rounded-lg hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700'>
//                             <h1 className='w-42 mb-2 text-4xl font-black tracking-tight hover:underline hover:cursor-pointer hover:text-blue-400 text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
//                             <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {val.departure_date} | {val.departure_time} </p>

//                             <select onChange={(e) => { setStatus(e.target.value) }} className='inline-flex items-center px-3 py-2 text-xl text-white bg-slate-400 rounded-lg hover:bg-slate-500 dark:focus:ring-blue-800'>
//                                 <option>on-time</option>
//                                 <option>delayed</option>
//                                 <option>CANCELLED</option>
//                             </select>
//                             <button onClick={() => { update(val.flight_num, val.departure_date, val.departure_time) }} className='ml-2 inline-flex items-center px-3 py-2 text-xl text-center text-white bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>Update</button>
//                         </div>
//                     )
//                 })}

//             </div>
//         </div>
//     )
// }
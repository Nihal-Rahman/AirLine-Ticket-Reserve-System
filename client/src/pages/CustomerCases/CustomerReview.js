import React from 'react';
import '../../CustomerReview.css'
import axios from "axios";
import { useEffect, useState } from "react"; 
import CustomerNavbar from '../../components/CustomerNavbar';

function CustomerReview(){
    const [listOfReviews, setListOfReviews] = useState([]);
    const [flightNum, setFlightNum] = useState([]);
    const [departure_date, setDepartureDate] = useState([]);
    const [departure_time, setDepartureTime] = useState([]);
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/customer/retrieveReviews",
        { 
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          console.log("Retrieve Reviews Error");
          console.log(response.data.error);
          alert("You are not logged in!");
        } else {
            setListOfReviews(response.data);
        }
      });
    }, []);

    const submitReview = () => {
      axios.post("http://localhost:3001/customer/writeReview", {
        flightNum,
        departure_date,
        departure_time,
        rating,
        comment
      }, {
        headers: { accessToken: sessionStorage.getItem("accessToken"), },
      }).then((response) => {
        if(response.data.error){
          console.log("Writing Reviews Error");
          console.log(response.data.error);
          alert(response.data.error);
        }
        else{
          console.log("Review was successfully created");
        }
      });
    }

      return(
        <div className = "customerReviewsPage">
          <CustomerNavbar />
          <div className='text-4xl text-center mt-48'>
            <h1 className='text-6xl underline mb-10'>Flight Reviews</h1>
            <div className = "viewPastReviews">

                    <div className='ml-10 mr-4 mt-4 grid grid-cols-5 gap-5 space-y-5'>
                      {listOfReviews.map((val) => {
                        return (
                          <div className='max-w-xl text-2xl p-6 bg-white border border-slate-300 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
                            <h1 className='w-42 mb-5 text-3xl font-black tracking-tight underline decoration-sky-500 text-gray-900 dark:text-white'>Flight {val.flight_num}</h1>
                            <p className='mb-3 font-normal text-gray-700'>{val.rating} / 10</p>
                            <p className='mb-3 font-normal text-gray-700'>{val.comments} </p>
                          </div>
                        )
                      })}
                    </div>
            </div> 
          </div> 
          <div className='mt-28 mb-20 space-y-8 text-3xl text-center'>
            <h1 className='text-5xl underline mb-4'>Review Flight</h1>
              <input type="text" name="flight_num" placeholder='Flight Number' required onChange={(e) => setFlightNum(e.target.value)}/>
              <br />
              <input type="text" name="departure_date" placeholder='Departure Date' required onChange={(e) => setDepartureDate(e.target.value)} />
              <br/>
              <input type="text" name="departure_time" placeholder='Departure Time' required onChange={(e) => setDepartureTime(e.target.value)}/>
              <br />
              <input type="number" name="rating" placeholder='Rating' required onChange={(e) => setRating(e.target.value)} />
              <br />
              <textarea name="comment" rows="6" onChange={(e) => setComment(e.target.value)} className="block p-2.5 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              <br />  
              <button onClick={submitReview} className='px-16 mb-16 mr-4 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-full hover:bg-sky-300 ' type='submit'>Create Review </button>
          </div>
        </div>
    );
}

export default CustomerReview
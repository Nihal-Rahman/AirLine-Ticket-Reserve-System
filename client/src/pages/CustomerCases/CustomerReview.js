import React from 'react';
import '../../CustomerReview.css'
import axios from "axios";
//import * as Yup from 'yup';  //allows us to vaidate our forms (ex: passwords have specific lengths/characters)
import { useEffect, useState } from "react"; 
import CustomerNavbar from '../../components/CustomerNavbar';

function CustomerReview(){
    const [listOfReviews, setListOfReviews] = useState([]);
    const [flightNum, setFlightNum] = useState([]);
    const [departure_date, setDepartureDate] = useState([]);
    const [departure_time, setDepartureTime] = useState([]);
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState([]);

    // const initialValues = {
    //   email: "",
    //   flightNum: "",
    //   departure_date: "",
    //   departure_time: "",
    //   rating: 0,
    //   comment: ""
    // }

    useEffect(() => {
      axios.get("http://localhost:3001/customer/retrieveReviews",
        { 
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          }
        }
      ).then((response) => {
        if (response.data.error) {
          console.log("Retrieve Reviews Error");
          console.log(response.data.error);
          alert("You are not logged in!");
        } else {
            //let reviews = response.data;
            //console.log(reviews);
            //console.log(response.data);
            setListOfReviews(response.data);
            //console.log(listOfReviews);
        }
      });
    }, []);

    const submitReview = () => {
      axios.post("http://localhost:3001/customer/writeReview", {
        flightNum: flightNum,
        departure_date: departure_date,
        departure_time: departure_time,
        rating: rating,
        comment: comment
      },{
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        }
      }
      ).then((response) => {
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

    // const validationSchema = Yup.object().shape({
    //   email: Yup.string().required("You must input a Title!"),
    //   flightNum: Yup.string().required("You must input a Title!"),
    //   departure_date: Yup.string().required("Required field (YYYY-MM-DD)."),
    //   departure_time: Yup.string().required("You must input a departure time!"),
    //   rating: Yup.number().required("You must input a rating out of 10"),
    //   comment: Yup.string().required("You must input a comment!")
    // });




      //console.log(listOfReviews);
      // console.log(listOfReviews[0][flightNum])
      return(
        <div className = "customerReviewsPage">
          <CustomerNavbar />
          <div className = "viewPastReviews">
            <section>
              <table className="table">
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                  {listOfReviews.map((review, ind) => {
                    return ( 
                      <tr> 
                        <td> {review.flight_num} </td> 
                        <td> {review.rating} </td>
                        <td> {review.comments} </td> 
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div> 
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className = "createNewReview">
            <h3> Create New Review </h3>
            <input type="text" name="flight_num" placeholder='Flight Number' onChange={(e) => setFlightNum(e.target.value)}/>
            <br />
            <input type="text" name="departure_date" placeholder='Departure Date' onChange={(e) => setDepartureDate(e.target.value)} />
            <input type="text" name="departure_time" placeholder='Departure Time' onChange={(e) => setDepartureTime(e.target.value)}/>
            <br />
            <input type="number" name="rating" placeholder='Rating' onChange={(e) => setRating(e.target.value)} />
            <input type="text" name="comment" placeholder='Comment' onChange={(e) => setComment(e.target.value)}/>
            <button onClick={submitReview} className="bg-[#424B5A] hover:bg-violet-300 text-white font-bold py-2 px-10 rounded-3xl">Create Review</button>
          </div>
        </div>
    );
}

export default CustomerReview
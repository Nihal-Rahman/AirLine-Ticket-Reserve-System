import React from 'react';
import '../CustomerReview.css'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';  //allows us to vaidate our forms (ex: passwords have specific lengths/characters)
import { useEffect, useState } from "react"; 

function CustomerReview(){

    const [listOfReviews, setListOfReviews] = useState([]);
    const [email, setEmail] = useState([]);
    const [flightNum, setFlightNum] = useState([]);
    const [departure_date, setDepartureDate] = useState([]);
    const [departure_time, setDepartureTime] = useState([]);
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState([]);

    const initialValues = {
      email: "",
      flightNum: "",
      departure_date: "",
      departure_time: "",
      rating: 0,
      comment: ""
    }

    const onSubmit = () => {
      axios.post("http://localhost:3001/customer/writeReview", {
        email,
        flightNum,
        departure_date,
        departure_time,
        rating,
        comment
      }).then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }
        else{
          console.log("Review was successfully created");
        }
      });
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string().required("You must input a Title!"),
      flightNum: Yup.string().required("You must input a Title!"),
      departure_date: Yup.string().required("Required field (YYYY-MM-DD)."),
      departure_time: Yup.string().required("You must input a departure time!"),
      rating: Yup.number().required("You must input a rating out of 10"),
      comment: Yup.string().required("You must input a comment!")
    });



    useEffect(() => {
        axios.get("http://localhost:3001/customer/retrieveReviews",
          { 
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
          if (response.data.error) {
            alert("You are not logged in!");
          } else {
              let reviews = response.data;
              console.log("Reviews: ", reviews);
              setListOfReviews(reviews);
          }
        });
      }, []);

      console.log(listOfReviews);
      console.log(listOfReviews[0][flightNum])
      return(
        <div className = "customerReviewsPage">
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
                        <td> {review[ind].flight_num} </td> 
                        <td> {review[ind].rating} </td>
                        <td> {review[ind].comments} </td> 
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div> 

          <div className = "createNewReview">
            <Formik initialValues={initialValues} onSubmit = {onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <ErrorMessage name="Email Address" component="span" />
                    <Field placeholder='johnsmith@gmail.com' autoComplete="off" id="inputReview" name="email" />
                    <br />

                    <ErrorMessage name="Flight Number" component="span" />
                    <Field placeholder='394' autoComplete="off" id="inputReview" name="flightNum" />
                    <br />

                    <ErrorMessage name="Departure Date" component="span" />
                    <Field placeholder='YYYY-MM-DD' autoComplete="off" id="inputReview" name="departure_date" />
                    <br />

                    <ErrorMessage name="Departure Time" component="span" />
                    <Field placeholder='HH:MM:SS' autoComplete="off" id="inputReview" name="departure_time"/>
                    <br />

                    <ErrorMessage name="Rating" component="span" />
                    <Field placeholder='0' autoComplete="off" id="inputReview" name="rating" />
                    <br />

                    <ErrorMessage name="Comment" component="span" />
                    <Field placeholder='Enter comment here' autoComplete="off" id="inputReview" name="comment" />
                    <br />

                    <button type='submit' className='button'>Create Review</button>
                </Form>
            </Formik>
          </div>
        </div>
    );
}

export default CustomerReview
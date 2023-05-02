import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StaffNavbar from "../../components/StaffNavbar";

function Flight(){

    let {flight_num, departure_date, departure_time} = useParams();
    const [arrival_date, setArrDate] = useState("");
    const [arrival_time, setArrTime] = useState("");
    const [departure_airport, setDepAirport] = useState("");
    const [arrival_airport, setArrAirport] = useState("");
    const [airline_name, setAirline] = useState("");
    const [airplane_ID, setPlaneID] = useState("");
    const [flight_status, setStatus] = useState("on-time");

    const [email, setEmail] = useState("");
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [reviewsList, setReviewsList] = useState([])

    useEffect(() => {
        axios.post("http://localhost:3001/staff/flight", { flight_num, departure_date, departure_time },
        {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!")
            }
            else {
                setArrDate(response.data[0].arrival_date);
                setArrTime(response.data[0].arrival_time);
                setDepAirport(response.data[0].departure_airport);
                setArrAirport(response.data[0].arrival_airport);
                setAirline(response.data[0].airline_name);
                setPlaneID(response.data[0].airplane_ID);
                setStatus(response.data[0].flight_status);
            }
        })

        axios.post("http://localhost:3001/staff/reviews", { flight_num, departure_date, departure_time },
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }).then((response) => {
                if (response.data.error) {
                    alert("You are not logged in!")
                }
                else {
                    setReviewsList(response.data);
                }
            })
    }, [])

    return(
        <div>
            <StaffNavbar />
            <div className="ml-4 mt-40 text-2xl">
                <div className="text-center max-w-screen p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <h1 className='w-42 underline mb-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white'>Flight {flight_num}</h1>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Departure: {departure_date} | {departure_time} </p>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Arrival: {arrival_date} | {arrival_time} </p>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{departure_airport} → {arrival_airport} </p>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{airplane_ID} | {airline_name} </p>
                    <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Status: {flight_status.toUpperCase()}</p>
                </div>
                <h1 className='w-42 mb-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white underline'>Reviews</h1>
                <div className='ml-4 grid gap-4 grid-cols-4 mt-10 space-y-5 text-2xl'>
                    {reviewsList.map((val) => {
                        return (
                            <div className='max-w-xl p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700'>
                                <h1 className='w-42 mb-5 text-4xl font-black tracking-tight underline decoration-sky-500 text-gray-900 dark:text-white'>{val.rating} / 10</h1>
                                <p className='mb-3 font-normal text-gray-700'>{val.comments} </p>
                                <p className='mb-3 text-lg font-normal text-right text-gray-700'>- {val.email_address} </p>

                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )


}

export default Flight;
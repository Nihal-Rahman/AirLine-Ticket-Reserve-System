import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StaffNavbar from '../../components/StaffNavbar';
import { useNavigate } from 'react-router-dom';


export default function AddPlane() {
    let history = useNavigate();

    const [airplane_ID, setID] = useState("");
    const [num_seats, setSeats] = useState("");
    const [manufactoring_comp, setComp] = useState("");
    const [manufactoring_date, setDate] = useState("");
    const [airline_name, setAirline] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/staff/flights", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert("You are not logged in!")
                history("/")
            }
        })
    }, [])

    const submitFlight = () => {
        const current = new Date();
        const curr_year = Number(`${current.getFullYear()}`);
        const age = curr_year - Number(manufactoring_date.substring(0, 4));
        const num_of_seats = Number(num_seats);

        axios.post('http://localhost:3001/staff/add-plane', {
            airplane_ID,
            num_of_seats,
            manufactoring_comp,
            manufactoring_date,
            age,
            airline_name
        }, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }).then(() => {
            console.log("successful insert");
        });
    };

    return (
        <div>
            <StaffNavbar />
            <div className='text-center mt-60'>
                <h1 className='text-7xl underline'>Add New Plane</h1>
                <div className='text-3xl mt-24'>
                    <input className='w-96' type='text' name="airplane_id" placeholder="Airplane ID" onChange={(e) => setID(e.target.value)} />
                    <br/>
                    <br/>
                    <input className='w-96' type='text' name="num_seats" placeholder="Number of Seats" onChange={(e) => setSeats(e.target.value)} />
                    <br />
                    <br />

                    <input className='w-96' type='text' name="manufactoring_comp" placeholder="Manufacturing Company" onChange={(e) => setComp(e.target.value)} />
                    <br/>
                    <br/>
                    <input className='w-96' type='text' name="manufactoring_date" placeholder="Manufacturing Date" onChange={(e) => setDate(e.target.value)} />
                    <br />
                    <br />
                    <input className='w-96' type='text' name="airline_name" placeholder="Airline Name" onChange={(e) => setAirline(e.target.value)} />
                    <br />
                    <br />
                    <br />
                    <button onClick={submitFlight} className="bg-[#424B5A] hover:bg-violet-300 text-white font-bold py-2 px-10 rounded-3xl">Submit</button>

                </div>
            </div>
        </div>
    )
}

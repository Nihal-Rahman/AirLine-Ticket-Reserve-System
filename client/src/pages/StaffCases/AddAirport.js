import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function AddAirport() {
    const [airport_code, setCode] = useState("");
    const [airport_name, setName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [airport_type, setType] = useState("");

    const submit = () => {
        axios.post('http://localhost:3001/staff/add-airport', {
            airport_code,
            airport_name,
            city,
            country,
            airport_type
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
            <div className='text-center mt-40'>
                <h1 className='text-7xl underline'>Add Airport</h1>
                <div className='text-3xl mt-24'>
                    <input className='w-1/5' type='text' name="airport_code" placeholder="Airport Code" onChange={(e) => setCode(e.target.value)} />
                    <br />
                    <br />
                    <input className='w-1/5' type='text' name="airport_name" placeholder="Airport Name" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <br />

                    <input className='w-1/5' type='text' name="city" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                    <br />
                    <br />
                    <input className='w-1/5' type='text' name="country" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                    <br />
                    <br />
                    <input className='w-1/5' type='text' name="airport_type" placeholder="Domestic/International/Both" onChange={(e) => setType(e.target.value)} />
                    <br />
                    <br />
                    <br />
                    <button onClick={submit} className="bg-[#424B5A] hover:bg-violet-300 text-white font-bold py-2 px-10 rounded-3xl">Submit</button>

                </div>
            </div>
        </div>
    )
}

import React from 'react';
import axios from "axios";
import { useEffect , useState } from 'react';
import Navbar from '../components/Navbar';

function Home() {
  const [role, setRole] = useState("")
    
  return (
    <div className='text-center mt-80'>
      <Navbar/>
      <h1 className='text-8xl mb-32 underline decoration-sky-300'>Welcome!</h1>
      <h1 className='text-4xl'>Here is our</h1>
      <h1 className='text-6xl mb-32 underline decoration-violet-300'>Air Ticket Reservation System</h1>
      <h1 className='text-3xl mb-4'>Nihal Rahman | Shubh Savani | Tanvi Rahman</h1>
      <h1 className='text-3xl '>CS-UY 3083 | Databases | Ratan Dey</h1>
    </div>
  )
}

export default Home
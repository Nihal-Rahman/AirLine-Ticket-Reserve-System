import React from 'react';
import axios from "axios";
import { useEffect , useState } from 'react';
import Navbar from '../components/Navbar';

function Home() {
    useEffect(()=>{
        axios.get("http://localhost:3001/register").then((response)=>{
          console.log(response.data);
        });
      }, []);
    
  return (
    <div className="App">
      <Navbar mt-8/>
    </div>
  )
}

export default Home
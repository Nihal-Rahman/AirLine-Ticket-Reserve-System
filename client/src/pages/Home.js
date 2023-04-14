import React from 'react';
import axios from "axios";
import { useEffect , useState } from 'react';

function Home() {
    useEffect(()=>{
        axios.get("http://localhost:3001/register").then((response)=>{
          console.log(response.data);
        });
      }, []);
    
  return (
    <div>Home</div>
  )
}

export default Home
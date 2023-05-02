import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ViewFlights from './StaffCases/ViewFlights'
import StaffNavbar from '../components/StaffNavbar';

export default function StaffHome() {

  return(
    <div>
      <StaffNavbar />
      <ViewFlights />
    </div>
    
  )
}
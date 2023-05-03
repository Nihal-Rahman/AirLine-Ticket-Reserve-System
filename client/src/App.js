import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import StaffRegister from './pages/StaffRegister';
import StaffLogin from './pages/StaffLogin';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import CustomerHome from './pages/CustomerHome';
import CancelFlights from './pages/CustomerCases/CancelFlights';
import SearchFlights from './pages/CustomerCases/SearchFlights';
<<<<<<< Updated upstream
=======
import CustomerReview from './pages/CustomerCases/CustomerReview';
>>>>>>> Stashed changes
import StaffHome from './pages/StaffHome';
import CreateFlight from './pages/StaffCases/CreateFlight'
import AddPlane from './pages/StaffCases/AddPlane'
import AddAirport from './pages/StaffCases/AddAirport'
import Flight from './pages/StaffCases/Flight';
import ViewReports from './pages/StaffCases/ViewReports';
import FrequentCustomers from './pages/StaffCases/FrequentCustomers';

function App() {
  return <div className="App">
    <Navbar relative flex absolute inset-y-0 />
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />

        <Route path='/user/register' exact element={<Register />} />
        <Route path='/user/login' exact element={<Login />} />
        <Route path='/customer/home' exact element={<CustomerHome />} />
        <Route path='/customer/cancelFlights' exact element={<CancelFlights />} />
        <Route path='/customer/search' exact element={<SearchFlights />} />

        <Route path='/staff/register' exact element={<StaffRegister />} />
        <Route path='/staff/login' exact element={<StaffLogin />} />
        <Route path='/staff/home' exact element={<StaffHome />} />
        <Route path='/staff/create-flight' exact element={<CreateFlight />} />
        <Route path='/staff/add-plane' exact element={<AddPlane />} />
        <Route path='/staff/add-airport' exact element={<AddAirport />} />
        <Route path='/flight/:flight_num/:departure_date/:departure_time' exact element={<Flight />} />
        <Route path='/staff/FrequentCustomers' exact element={<FrequentCustomers/>}/>
        <Route path='staff/viewReports' exact element={<ViewReports/>} />
      </Routes>
    </Router>
  </div>;
}

export default App;
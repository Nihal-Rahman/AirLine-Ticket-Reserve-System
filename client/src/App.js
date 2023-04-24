import './App.css';
import{BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import StaffRegister from './pages/StaffRegister';
import StaffLogin from './pages/StaffLogin';
import Navbar from './components/Navbar';
import Login from './pages/Login'

function App() {
  return <div className="App">
    <Navbar relative flex absolute inset-y-0/>
    <Router> 
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/staff/register' exact element={<StaffRegister/>}/>
        <Route path='/staff/login' exact element={<StaffLogin/>}/>
        <Route path='/user/register' exact element={<Register />} />
        <Route path='/user/login' exact element={<Login />} />
      </Routes>
    </Router>
    </div>;
}

export default App;

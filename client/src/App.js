import './App.css';
import{BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import StaffRegister from './pages/StaffRegister';

function App() {
  return <div className="App">
    <Router> 
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/user' exact element={<Register/>}/>
        <Route path='/staff' exact element={<StaffRegister/>}/>
      </Routes>
    </Router>
    </div>;
}

export default App;

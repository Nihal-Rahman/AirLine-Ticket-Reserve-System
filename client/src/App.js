import './App.css';
import{BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return <div className="App">
    <Router> 
      <Link to="/user">Register a User</Link>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/user' exact element={<Register/>}/>
      </Routes>
    </Router>
    </div>;
}

export default App;

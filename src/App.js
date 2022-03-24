import "./styles/App.css"
import React from 'react';
import SignUp from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from './pages/about';
import Contact from './pages/contact';

function App() {

        return (
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </Router>
          
     );
}

export default App;
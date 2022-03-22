import "./styles/App.css"
import React from 'react';
import SignUp from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";

function App() {

        return (
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              
            </Routes>
          </Router>
          
     );
}

export default App;
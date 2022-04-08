import "./styles/App.css"
import React from 'react';
import SignUp from './components/signup';
import Login from './components/login';
import Navbar from './components/Navbar/navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/home";
import About from './pages/about';
import Contact from './pages/contact';
import Profile from "./components/profile";

function App() {

        return (
          <Router>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path='/userProfile' element={<Profile />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} />
            </Routes>
          </Router>
          
     );
}

export default App;
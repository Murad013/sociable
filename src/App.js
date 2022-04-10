import "./styles/App.css"
import React from 'react';
import SignUp from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import Navbar from './components/Navbar/navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/home";
import About from './pages/about';
import Contact from './pages/contact';
import Profile from "./components/profile";


function App() {
        return (
          <>
          <Router>
            <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path='/userProfile' element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
            </Routes>
            </div>
          </Router>
          </>
     );
}

export default App;
import "./styles/App.css"
import React from 'react';
import SignUp from './components/signup';
import Login from './components/login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/home";

function App() {

        return (
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              
            </Routes>
          </Router>
          
     );
}

export default App;
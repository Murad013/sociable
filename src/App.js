import "./styles/App.css"
import React from 'react';
import SignUp from './components/signup';
import LogIn from './components/login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/home";

function App() {

        return (
          <Router>
            <div className="App">
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
            </div>
          </Router>
          
     );
}

export default App;
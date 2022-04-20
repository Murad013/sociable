import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Login() {
     const navigate = useNavigate();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');


     const loginFunction = () => {
          Axios.post('http://localhost:3001/api/users/login', {
            email: email,
            password: password
          }, {
            withCredentials: true
          }).then((data) => {
            const cookies = new Cookies();
            cookies.set('token',data.data.token);
            swal(`Success!`,"Welcome Back!", "success");
            navigate('/home', { replace: true })
          }).catch(() => {
            swal(`Sorry...`, "Invalid email or password", "error");
          });
        };

        return (
        <div className = "loginForm">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen"></link>   
          <div class= "split right">
            <div class = "logIn">
              <h2>Welcome back!</h2>
              <h1>Log In to Sociable.</h1>
              <div class = "input">
                <input type = "text" placeholder='Email' name = "email" onChange ={(e) => {
                  setEmail(e.target.value);
                }}/>
              </div>
              <div class = "input">
                <input type = "password" placeholder='Password' name = "password" onChange ={(e) => {
                  setPassword(e.target.value);
                }}/>
              </div>
              <button onClick={loginFunction}>LOG IN</button>
            </div>
          </div>
            <div class = "split left">
              <div class = "signUpReroute">
                <h2>Don't have an account?</h2>
                <h1>Sign up to stay connected!</h1>
                <Link to={"/"}>SIGN UP</Link>
              </div>
            </div>
        </div>
     )
}
import Axios from 'axios';
import React, {useState} from 'react';
//import {Form} from 'antd;'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Login() {
     const navigate = useNavigate();
     const [display_name, setDisplayName] = useState('');
     const [password, setPassword] = useState('');


     const login = () => {
          Axios.post('http://localhost:3001/api/users/login', {
            display_name: display_name,
            password: password
          }).then(() => {
            swal(`Hey ${display_name}!`,"Welcome To Sociable!", "success");
            navigate('/home', { replace: true })
          }).catch(() => {
            swal(`Sorry ${display_name}`, "Invalid Username or password", "error");
          });
        };

        return (
          <div className = "loginForm">
            <h1>Login to Sociable!</h1>
            <input type = "text" placeholder='Display Name' name = "display_name" onChange ={(e) => {
              setDisplayName(e.target.value);
            }}/>
            <input type = "text" placeholder='Password' name = "password" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>
            <button onClick={login}>Log In!</button>
            <Link to={"/"}>Go back to sign up.</Link>
        </div>
     )
}

export default Login;
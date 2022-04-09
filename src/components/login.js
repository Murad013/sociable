import Axios from 'axios';
import React, {useState} from 'react';
//import {Form} from 'antd;'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Login() {
     const navigate = useNavigate();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');


     const login = () => {
          Axios.post('http://localhost:3001/api/users/login', {
            email: email,
            password: password
          }, {
            withCredentials: true
          }).then((data) => {
            const cookies = new Cookies();
            console.log(data)
            cookies.set('token',data.data.token);
            swal(`Success!`,"Welcome Back!", "success");
            navigate('/home', { replace: true })
          }).catch(() => {
            swal(`Sorry...`, "Invalid email or password", "error");
          });
        };

        return (
          <div className = "loginForm">
            <h1>Login to Sociable!</h1>
            <input type = "text" placeholder='Email' name = "email" onChange ={(e) => {
              setEmail(e.target.value);
            }}/>
            <input type = "password" placeholder='Password' name = "password" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>
            <button onClick={login}>Log In!</button>
            <Link to={"/"}>Go back to sign up.</Link>
        </div>
     )
}

export default Login;
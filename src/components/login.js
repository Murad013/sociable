import Axios from 'axios';
import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function Login() {

     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const login = () => {
          Axios.post('http://localhost:3001/api/users/login', {
            username: username,
            password: password
          }).then(() => {
            swal(`HEY ${username}`,"Welcome To Sociable!", "success");
          }).then(() => {
      
          }).catch(() => {
            swal("Oops!", "Invalid Username or Password", "error");
          });
        };

        return (
          <div className = "loginForm">
            <h1>Login to Sociable!</h1>
            <label>Username:</label>
            <input type = "text" name = "firstName" onChange ={(e) => {
              setUsername(e.target.value);
            }}/>
            <label>Password:</label>
            <input type = "text" name = "lastName" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>
            <button onClick={login}>Log In!</button>
            <Link to={"/signup"}>Go back to sign up</Link>

        </div>
     )
}

export default Login;
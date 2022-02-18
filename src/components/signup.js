import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
     const navigate = useNavigate();
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [gender, setGender] = useState('');

     const signup = () => {
          Axios.post('http://localhost:3001/api/users/signup', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            gender: gender
          }).then(() => {
            swal(`Hey ${firstName}!`,"Welcome To Sociable!", "success");
            navigate('/home', { replace: true })
          }).catch(() => {
            swal(`Sorry ${firstName}`, "Username's Already Taken...", "error");
          });
        };

        return (
          <div className = "signUpForm">
            <h1>Sign Up To Sociable!</h1>
            <label>First Name:</label>
            <input type = "text" name = "firstName" onChange ={(e) => {
              setFirstName(e.target.value);
            }}/>
            <label>Last Name:</label>
            <input type = "text" name = "lastName" onChange ={(e) => {
              setLastName(e.target.value);
            }}/>
            <label>Username:</label>
            <input type = "text" name = "username" onChange ={(e) => {
              setUsername(e.target.value);
            }}/>
            <label>Password:</label>
            <input type = "text" name = "password" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>
            <label>Gender:</label>
            <input type = "text" name = "gender" onChange ={(e) => {
              setGender(e.target.value);
            }}/>
            <button onClick={signup}>Sign Up</button>
            <Link to={"/login"}>Log In!</Link>

        </div>
     )
}

export default SignUp;
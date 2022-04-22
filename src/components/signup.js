import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  
     const navigate = useNavigate();
     const [firstname, setFirstName] = useState('');
     const [lastname, setLastName] = useState('');
     const [username, setUsername] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [gender, setGender] = useState('');
     const [age, setAge] = useState('');

     const signup = () => {
          Axios.post('http://localhost:3001/api/users/signup', {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            gender: gender,
            age: age
          },{
            withCredentials: true
          }).then(() => {
                swal(`Success!`,"Please Log In!", "success");
                navigate('/login', { replace: true });
          }).catch(() => {
            swal(`Sorry ${firstname}`, `${email} is already taken...`, "error");
          });
        };

        return (
          <div className = "signUpForm">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen"></link>              
              <div class= "split left">
                <div class = "signUp">
                  <h2>New here?</h2>
                  <h1>Sign Up To Sociable!</h1>
                  <div class = "input">
                  <input type = "text" placeholder='First Name' name = "firstname" onChange ={(e) => {
                    setFirstName(e.target.value);
                  }}/>
                  </div>
                  <div class = "input">
                  <input type = "text" placeholder='Last Name' name = "lastname" onChange ={(e) => {
                    setLastName(e.target.value);
                  }}/>
                  </div>
                  <div class = "input">
                  <input type = "text" placeholder='Username' name = "username" onChange ={(e) => {
                    setUsername(e.target.value);
                  }}/>
                  </div>
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
                  <div class = "input">
                  <select name="gender" id="gender" onChange ={(e) => {
                      setGender(e.target.value);
                      }}>
                        <option disabled="disabled" selected="selected">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>                  
                  </select>
                  </div>
                  <div class = "input">
                  <input type = "text" placeholder='Age' name = "age" onChange ={(e) => {
                    setAge(e.target.value);
                  }}/>
                  </div>
                  <button onClick={signup}>SIGN UP</button>
                  </div>
                </div>
                <div class = "split right">
                  <div class = "LogInReroute">
                    <h1>Already have an account?</h1>
                    <h2>Log in and stay connected.</h2>
                    <Link to={"/login"}>LOG IN</Link>
                  </div>
                </div>
            </div>
     )
}
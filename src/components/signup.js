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
            <h1>Sign Up To Sociable!</h1>
            <input type = "text" placeholder='First Name' name = "firstname" onChange ={(e) => {
              setFirstName(e.target.value);
            }}/>
            <input type = "text" placeholder='Last Name' name = "lastname" onChange ={(e) => {
              setLastName(e.target.value);
            }}/>
            <input type = "text" placeholder='Username' name = "username" onChange ={(e) => {
              setUsername(e.target.value);
            }}/>
            <input type = "text" placeholder='Email' name = "email" onChange ={(e) => {
              setEmail(e.target.value);
            }}/>
            <input type = "password" placeholder='Password' name = "password" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>

            <label for="gender">Gender:</label>
            <select name="gender" id="gender" onChange ={(e) => {
              setGender(e.target.value);
            }}>
              <optgroup label="Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </optgroup>
            </select>

            
            <input type = "text" placeholder='Age' name = "age" onChange ={(e) => {
              setAge(e.target.value);
            }}/>
            <button onClick={signup}>Sign Up</button>
            <Link to={"/login"}>Log In!</Link>

        </div>
     )
}
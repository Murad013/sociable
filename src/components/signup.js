import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
     const navigate = useNavigate();
     const [firstname, setFirstName] = useState('');
     const [lastname, setLastName] = useState('');
     const [display_name, setDisplayName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [gender, setGender] = useState('');
     const [age, setAge] = useState('');

     const signup = () => {
          Axios.post('http://localhost:3001/api/users/signup', {
            firstname: firstname,
            lastname: lastname,
            display_name: display_name,
            email: email,
            password: password,
            gender: gender,
            age: age
          }).then(() => {
            swal(`Hey ${firstname}!`,"Welcome To Sociable!", "success");
            navigate('/home', { replace: true });
          }).catch(() => {
            swal(`Sorry ${firstname}`, "Username's Already Taken...", "error");
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
            <input type = "text" placeholder='Display Name' name = "display_name" onChange ={(e) => {
              setDisplayName(e.target.value);
            }}/>
            <input type = "text" placeholder='Email' name = "email" onChange ={(e) => {
              setEmail(e.target.value);
            }}/>
            <input type = "text" placeholder='Password' name = "password" onChange ={(e) => {
              setPassword(e.target.value);
            }}/>
            <input type = "text" placeholder='Gender' name = "gender" onChange ={(e) => {
              setGender(e.target.value);
            }}/>
            <input type = "text" placeholder='Age' name = "age" onChange ={(e) => {
              setAge(e.target.value);
            }}/>
            <button onClick={signup}>Sign Up</button>
            <Link to={"/login"}>Log In!</Link>

        </div>
     )
}

export default SignUp;
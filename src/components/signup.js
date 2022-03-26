import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  
     const navigate = useNavigate();
     const [firstname, setFirstName] = useState('');
     const [lastname, setLastName] = useState('');
     const [username, setUsername] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [gender, setGender] = useState('');
     const [age, setAge] = useState('');

     const signup = () => {
          Axios.post('/api/users/signup', {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            gender: gender,
            age: age
          }).then(() => {
                swal(`Success!`,"What's a Fun Fact about yourself?", "success");
                navigate('/userprofile', { replace: true });
          }).catch(() => {
            swal(`Sorry ${firstname}`, `${email} is already taken...`, "error");
          }).catch(() => {
            swal(`Sorry ${firstname}`, `${username} is already taken...`, "error");
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
// import this function into App.js once you figure how to get rid of that component error. Just to make the App look more organized and presentable.
import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';

function SignUp() {

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
            swal(`HEY ${firstName}`,"Welcome To Sociable!", "success");
          }).then(() => {
      
          }).catch(() => {
            swal("Oops!", "Username Already Taken...", "error");
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
            <button onClick={signup}>Sign Up!</button>

        </div>
     )
}

export default SignUp;
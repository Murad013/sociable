//Can have the login function in here, export it, and use it in the app.


//To better understand the App, we can have the starting page as a signup page, once the user signs up, and if the user 
// already has an account they can just use the login link and go from there. After logging in/signing up, the user will
// be redirected to the homepage of the app, then, and only then can they post and view other posts by other users.

//Things to consider:
//   Protected Resources:Updating your own post (Only you can do that), delete your own post, (Only you can admin can do that)
//   Non-protected resources: Getting all posts, getting all posts by ID (viewing someone else's profile) Getting your posts (Viewing your own profile)


//MVP3: Adding customization to your own profile. That would be sick.


import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';

function LogIn() {

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
        </div>
     )
}

export default LogIn;
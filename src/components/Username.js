import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Username() {
     const navigate = useNavigate();
     const [username, setUsername] = useState('');

     const createUsername = () => {
     Axios.post('http://localhost:3001/api/users/username', {
       username: username
     }).then(() => {
         swal(`Hey ${username}!`,"Welcome To Sociable!", "success");
         navigate('/home', { replace: true });
     }).catch(() => {
       swal(`Sorry...`, "Username's Already Taken...", "error");
     });
   }
   return (
        
     <div className = "signUpForm">
          <h3>Username Selection</h3>
          <input type = "text" placeholder='Username' name = "username" onChange ={(e) => {
          setUsername(e.target.value);
     }}/>
     <button onClick={createUsername}>Submit!</button>
     </div>
   )
}

export default Username;
import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Username() {
     const navigate = useNavigate();
     const [bio, setBio] = useState('');

     const createProfile = () => {
     Axios.post('/api/users/profile', {
       bio: bio
     }).then(() => {
         swal(`Success!`,"Welcome To Sociable!", "success");
         navigate('/home', { replace: true });
     }).catch(() => {
       swal(`Sorry...`, "Username's Already Taken...", "error");
     });
   }
   return (
        
     <div className = "signUpForm">
          <h3>Bio</h3>
          <input type = "text" placeholder='Tell Us Something Fun About Yourself' name = "bio" onChange ={(e) => {
          setBio(e.target.value);
     }}/>
     <button onClick={createProfile}>Submit!</button>
     </div>
   )
}

export default Username;
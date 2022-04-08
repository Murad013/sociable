import Axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Profile() {
     const navigate = useNavigate();
     const [bio, setBio] = useState('');

     const createProfile = () => {
     Axios.post('http://localhost:3001/api/users/profile', {
       bio: bio
     },
     {
       withCredentials:true
     }).then(() => {
         swal(`Success!`,"Welcome To Sociable!", "success");
         navigate('/home', { replace: true });
     }).catch(() => {
       swal(`Sorry...`, "Invalid Request", "error");
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

export default Profile;
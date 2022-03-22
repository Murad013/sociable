import React from 'react';
import Axios from 'axios';
import {useState} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Home() {
     const [postContent, setPostContent] = useState('');

     const post = () => {
          Axios.post('http://localhost:3001/api/posts/post', {
            body: postContent
          }).then(() => {
            swal('Success',"Post Successful", "success");
          }).catch(() => {
            swal("Error","Could Not Post", "error");
          });
        }
     return (
          <div className='Home'>
               <h1>Welcome!</h1>
               <Link to={"/login"}><button>Logout!</button></Link>
               <div className='postForm'>
                    <input type='text' placeholder='Something on your mind?' name='postContent' onChange ={(e) => {setPostContent(e.target.value);}}/>

               <button onClick={post}>Post</button>
               </div>
          </div>
     )
}

export default Home;
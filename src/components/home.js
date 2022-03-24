import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Home() {
     const [body, setBody] = useState('');
     const post = () => {
          Axios.post('http://localhost:3001/api/posts/post', {
            body: body
          }).then(() => {
            swal('Success',"Post Successful", "success");
          }).catch(() => {
            swal("Error","Could Not Post", "error");
          });
        }

     const[posts, setPosts] = useState([]);
     useEffect(() => {
        fetch('api/posts')
        .then((res) => res.json())
        .then((json) => setPosts(json.body));
     }, []);

     return (
          <div className='Home' style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '90vh'
             }}>
               <h1>Welcome!</h1>
               <Link to={"/login"}><button>Logout!</button></Link>
               <div className='postForm'>
                    <input type='text' placeholder='Something on your mind?' name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>

               <button onClick={post}>Post</button>
               </div>
               <div className='posts'>
               <ul>
                {posts.map((t) => (
                <li>{t.body}</li>
                ))}
               </ul>
               </div>
          </div>
     )
}

export default Home;
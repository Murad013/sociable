import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Home() {
  const [body, setBody] = useState('');
  const[posts, setPosts] = useState([]);
  const [time, setTime] = useState([]);
  
  const post = () => {
    Axios.post('/api/posts/post', {
      body: body
    }).then(() => {
      setBody('');
      swal('Success',"Post Successful", "success");
    }).catch(() => {
      swal("Error","Could Not Post", "error");
    });
  }


     //getting all the posts on the homepage
     useEffect(() => {
        Axios.get("/api/posts")
        .then((json) => {
          console.log(json)
          setPosts(json.data.data);
          setTime(json.data.data);
        })
     }, [posts,time]);

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
                        <input type='text' placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                        <button onClick={post}>Post</button>
                    </div>
                    <div className='posts' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh',
                    overflow: 'hidden',
                    }}>
                        <ul>
                            {posts?.map((t) => {
                              return <li>{t.body}</li>
                            }
                            )}
                            {time?.map((t) => {
                              return <li>{t.time_created}</li>
                            }
                            )}
                        </ul>
                    </div>
          </div>
     )
}

export default Home;
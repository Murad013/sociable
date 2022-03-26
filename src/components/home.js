import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Home() {
  const [username, setUsername] = useState([]);
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
          setUsername(json.data.data);
          setPosts(json.data.data);
          setTime(json.data.data);
        })
     }, [username,posts,time]);

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
                    <div className='posts'>
                        <ul>
                            {posts?.map((t) => {
                              return <li>
                                <b>{t.username}</b><br></br>
                                <div className = "postBox" style={{
                                  width: '320px',
                                  padding: '10px',
                                  border: '5px solid gray',
                                  margin: '0'
                                }}>{t.body}</div><br></br>
                                         {t.time_created}</li>
                            }
                            )}
                        </ul>
                    </div>
          </div>
     )
}

export default Home;
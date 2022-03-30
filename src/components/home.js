import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/App.css';

function Home() {
  const [username, setUsername] = useState([]);
  const [body, setBody] = useState('');
  const[posts, setPosts] = useState([]);
  const [time, setTime] = useState([]);
  
  const post = () => {
    Axios.post('http://localhost:3001/api/posts/post', {
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
        Axios.get("http://localhost:3001/api/posts")
        .then((json) => {
          setUsername(json.data.data);
          setPosts(json.data.data);
          setTime(json.data.data);
        })
     }, [username,posts,time]);

     return (
               <div className='Home' style={{textAlign: 'center'}}>
                    <h1>Welcome!</h1>
                    <div className='postForm'>
                        <input type='text' placeholder='Something on your mind ?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                        <br></br>
                        <br></br>
                        <button onClick={post}>Post</button>
                    </div>
                    <ul>
                            {posts?.map((t) => {
                              return <li style={{
                                display: 'inline-block',
                                background: '#256ce1',
                                color: 'white',
                                border: '1px solid #ccc',
                                borderRadius: 6,
                                padding: '15 15 15 15',
                                margin: '10px 10px 0 0',
                                overflow: 'hidden',
                                width: '50%'
                              }}>
                                <b>{t.username}</b>
                                <br></br>
                                {t.body}<br></br>
                                {t.time_created}
                                </li>
                            }
                            )}
                    </ul>
          </div>
     )
}

export default Home;
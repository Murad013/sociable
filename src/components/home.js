import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/App.css';

export default function Home() {
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  const createPost = () => {
    if (body){
      Axios.post('http://localhost:3001/api/posts/post', 
      {body},
      {withCredentials: true}
      ).then(() => {
        swal('Success', "Post Successful", "success");
        setBody('');
        getPosts();
      }).catch(() => {
        swal("Error", "Could Not Post", "error");
      });
    }
    else{
      return swal("Error", "Please Enter Something", "error");
    }
}
  // To get all posts regardless of user ID
  const getPosts = () => {
      Axios.get("http://localhost:3001/api/posts", {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true
      })
      .then((json) => {
      setPosts(json.data.data);
      });
  }
  // To render page when posts are made
  useEffect(() => {
      getPosts();
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      createPost();    
    }
  }

     return (
               <div className='Home' style={{textAlign: 'center'}}>
                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <h1>Something on your mind?</h1>
                    <div className='postForm'>
                        <input type='text' onKeyDown={handleKeyDown} placeholder='Share it with the world!' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                        </div>
                        <button onClick={createPost}>POST</button>
                    <ul>
                        
                            {posts.map((post, i) => {
                              return <li key = {i} style={{
                                display: 'block',
                                background: 'linear-gradient(47deg, rgba(113,152,155,1) 0%, rgba(68,102,111,1) 27%, rgba(28,57,72,1) 100%)',                                
                                color: 'white',
                                border: '1px solid #71989b',
                                borderRadius: '10px',
                                padding: '15 .5em 15 .5em',
                                margin: '0 auto 15 auto',
                                overflow: 'hidden',
                                width: '40em',
                                boxShadow: '0 0 3px #17303c5d'
                              }}>
                                <div className = "postBox">
                                  <div className= "user">
                                    <b>{post?.username}</b>
                                  </div>                          
                                    <p>{post?.time_created}</p>
                                  <br></br>
                                  <div className = "postBody">
                                    <b>{post?.body}</b><br></br>
                                  </div>
                                </div>
                                </li> 
                                
                            }
                            )}
                            
                    </ul>
          </div>
     )
}

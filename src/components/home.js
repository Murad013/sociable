import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/App.css';

export default function Home() {
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  const createPost = () => {
      Axios.post('http://localhost:3001/api/posts/post', {
      body: body
      },
      {withCredentials: true}
      ).then(() => {
        swal('Success', "Post Successful", "success");
        setBody('');
        getPosts();
      }).catch(() => {
        swal("Error", "Could Not Post", "error");
      });
  }
  // To edit post content
  const editPost = () => {
      Axios.patch('http://localhost:3001/api/posts/post/:pid', 
      {body: body},
      {withCredentials: true}
      ).then(() => {
        getPosts();
      }).catch(() => {
        swal("Error", "Could Not Edit", "error");
      });
  }
  // To delete post
  const deletePost = () => {
      Axios.delete('http://localhost:3001/api/posts/post/:pid', 
      {body: body},
      {withCredentials: true}
      ).then(() => {
        getPosts();
      }).catch(() => {
        swal("Error", "Could Not Edit", "error");
      });
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

     return (
               <div className='Home' style={{textAlign: 'center'}}>
                    <h1>Home</h1>
                    <div className='postForm'>
                        <input type='text' placeholder='Something on your mind ?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                        <br></br>
                        <br></br>
                        <button onClick={createPost}>Post</button>
                    </div>
                    <ul>
                            {posts.map((post, i) => {
                              return <li key = {i} style={{
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
                                <b>{post?.username}</b>
                                <br></br>
                                {post?.body}<br></br>
                                {post?.time_created}
                                </li>
                            }
                            )}
                    </ul>
          </div>
     )
}
import React from 'react';
import Axios from 'axios';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/App.css';

function Home() {
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  const post = () => {
    Axios.post('http://localhost:3001/api/posts/post', {
      body: body
    },
    {withCredentials: true}
    ).then(() => {
      setBody('');
      swal('Success', "Post Successful", "success");
      getPosts();
    }).catch(() => {
      swal("Error", "Could Not Post", "error");
    });
  }
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
    useEffect(() => {
      getPosts();
    }, []);

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
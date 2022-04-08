import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Profile() {
     const navigate = useNavigate();
     const [body, setBody] = useState('');
     const [bio, setBio] = useState('');
     const [pfp, setPfp] = useState([]);
     const [posts, setPosts] = useState([]);

     const createProfile = () => {
     Axios.post('http://localhost:3001/api/users/profile', 
     {bio: bio,
      pfp: pfp},
     {withCredentials:true}
     ).then(() => {
         swal(`Success!`,"Welcome To Sociable!", "success");
         navigate('/home', { replace: true });
     }).catch(() => {
       swal(`Sorry...`, "Invalid Request", "error");
     });
   }

   const post = () => {
    Axios.post('http://localhost:3001/api/posts/post', 
    {body: body},
    {withCredentials: true}
    ).then(() => {
      swal('Success', "Post Successful", "success");
      setBody('');
      getPostsByUserId();
    }).catch(() => {
      swal("Error", "Could Not Post", "error");
    });
  }

   const getPostsByUserId = () => {
    Axios.get("http://localhost:3001/api/posts/:suid", 
    {
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
      getPostsByUserId();
    }, []);
   return (
        
     <div className = "profilePage">
          <h3>Bio</h3>
          <input type = "text" placeholder='Tell Us Something Fun About Yourself' name = "bio" onChange ={(e) => {
          setBio(e.target.value);
          }}/>
          <input type = "file" placeholder='Profile Pic' name = "image" onChange ={(e) => {
          setPfp(e.target.value);
          }}/>
          <button onClick={createProfile}>Submit!</button>
          <div className='postForm'>
                        <input type='text' placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
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

export default Profile;
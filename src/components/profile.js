import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
//import { useNavigate } from 'react-router-dom';

function Profile() {
     //const navigate = useNavigate();
     const [body, setBody] = useState('');
     const [bio, setBio] = useState('');
     const [pfp, setPfp] = useState([]);
     const [posts, setPosts] = useState([]);
     const [users, setUser] = useState([]);
     const [profile, setProfile] = useState([]);

     const editProfile = () => {
     Axios.post('http://localhost:3001/api/users/profile', 
     {bio: bio,
      pfp: pfp},
     { 
     method: 'POST',
     mode: 'no-cors',
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json',
     },
     withCredentials: true}
     ).then(() => {
         swal(`Success!`,"Thank You For Your Input!", "success");
         setBio('');
         setPfp('');
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
  //To get profile bio and profile picture
  const getProfileInfo = () => {
    Axios.get("http://localhost:3001/api/users/:username", 
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
      console.log(json.data.data);
      setProfile(json.data.data);
    });
  }

  //To get user's firstname or any other information to display on their profile
  const getUserByUserId = () => {
    Axios.get("http://localhost:3001/api/users/:suid", 
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
      setUser(json.data.data);
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
      getProfileInfo();
      getPostsByUserId();
      getUserByUserId();
   }, []);


   return (
        
          <div className = "profilePage" style={{textAlign: 'center'}}>
                <input type = "text" placeholder='Tell Us Something Fun About Yourself' name = "bio" onChange ={(e) => {setBio(e.target.value);}}/>
                <br></br>
                <input type = "file" placeholder='Profile Pic' name = "image" onChange ={(e) => {setPfp(e.target.value);}}/>
                <br></br>
                <button onClick={editProfile}>Submit!</button>
                <div className='postForm'>
                              <input type='text' placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                              <br></br>
                              <br></br>
                              <button onClick={post}>Post</button>
          </div>
          <ul>
                              {profile?.map((p) => {
                               return (<li>
                                <b>{p.bio}</b>
                                <br></br>
                                {p.pfp}
                                </li>)
                              }
                              )}
                              </ul>
                              <ul>
                              {/*Can insert all user information here in a nice style*/}
                              {users?.map((u) => {
                               return (<li style={{
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
                                <b>First Name: {u.firstname}</b>
                                <br></br>
                                <b>Last Name: {u.lastname}</b>
                                <br></br>
                                <b>Age: {u.age}</b>
                                <br></br>
                                <b>Gender: {u.gender}</b>
                                <br></br>
                                </li>)
                              }
                              )}
                              </ul>
                              <ul>
                              {posts?.map((t) => {
                              return (
                              <li style={{
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
                                </li>)
                              }
                              )}
           </ul>
     </div>
   )
}

export default Profile;
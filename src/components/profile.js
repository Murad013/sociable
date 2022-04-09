import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/profile.css';
//import { useNavigate } from 'react-router-dom';

function Profile() {
    //const navigate = useNavigate();
    const [body, setBody] = useState('');
    const [bio, setBio] = useState('');
    const [pfp, setPfp] = useState([]);
    const [posts, setPosts] = useState([]);
    const [users, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const addProfileInfo = () => {
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
     }).catch(() => {
        swal(`Sorry...`, "Invalid Request", "error");
     });
   }
    const editProfileInfo = () => {
      Axios.patch('http://localhost:3001/api/users/profile', 
      {bio: bio},
      { 
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true}
      ).then(() => {
          swal(`Success!`,"Profile Updated!", "success");
          setBio('');
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
        Axios.get("http://localhost:3001/api/users/userProfile/:username", 
        {
          withCredentials: true
        })
        .then((json) => {
          setProfile(json.data.data);
        });
      }

    //To get user's firstname or any other information to display on their profile
    const getUserByUserId = () => {
        Axios.get("http://localhost:3001/api/users/userID/:suid", 
        {
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
        getPostsByUserId();
        getUserByUserId();
        getProfileInfo();
    }, []);


   return (
          <div className = "profilePage" style={{textAlign: 'center'}}>
                <div className='addingProfileInfo'  style={{textAlign: 'center'}}>
                  <button>Add Profile Information</button>
                  <div className='modal' id='modal'>
                    <div className='modal-header'>
                      <div className='title'>
                        Profile Setup
                      </div>
                      <button className='close-button'>&times;</button>
                    </div>
                    <div className='modal-body'>
                      <div className='modal-body-profile-form'>
                        <h3>Bio</h3>
                        <input type = "text" placeholder='Tell Us Something Fun' name = "bio" onChange ={(e) => {setBio(e.target.value);}}/>
                      </div>
                    </div>
                  </div>
                  <div id='overlay'></div>
                </div>
                <div className='editingProfileInfo'>
                    <input type = "text" placeholder='Tell Us Something Fun' name = "bio" onChange ={(e) => {setBio(e.target.value);}}/>
                    <br></br>
                    <button onClick={editProfileInfo}>Submit!</button>
                </div>
                <div className='postForm'>
                    <input type='text' placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                    <br></br>
                    <br></br>
                    <button onClick={post}>Post</button>
                </div>
                {/*profile information*/}
                <ul>
                    {profile?.map((t) => {
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
                          width: '50%'}}>
                          <b>Bio: {t.bio}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*user information*/}
                <ul>
                    {users?.map((t) => {
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
                          width: '50%'}}>
                          <b>First Name: {t.firstname}</b>
                          <br></br>
                          <b>Last Name: {t.lastname}</b>
                          <br></br>
                          <b>Age: {t.age}</b>
                          <br></br>
                          <b>Gender: {t.gender}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*posts information*/}
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
                        width: '50%'}}>
                        <b>{t.username}</b>
                        <br></br>
                        {t.body}<br></br>
                        {t.time_created}
                        </li>)
                    })}
                </ul>
          </div>
          )
}

export default Profile;
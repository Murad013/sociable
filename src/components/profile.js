import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import '../styles/profile.css';
import Cookies from 'universal-cookie';
//import { useNavigate } from 'react-router-dom';

function Profile() {
    //const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [users, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [body, setBody] = useState('');
    const [bio, setBio] = useState('');
    //const [pfp, setPfp] = useState([]);

    
    // const addProfileInfo = () => {
    //  Axios.post('http://localhost:3001/api/users/profile', 
    //  {bio: bio,
    //   pfp: pfp},
    //  { 
    //  method: 'POST',
    //  mode: 'no-cors',
    //  headers: {
    //    'Access-Control-Allow-Origin': '*',
    //    'Content-Type': 'application/json',
    //  },
    //  withCredentials: true}
    //  ).then(() => {
    //      swal(`Success!`,"Thank You For Your Input!", "success");
    //      setBio('');
    //  }).catch(() => {
    //     swal(`Sorry...`, "Invalid Request", "error");
    //  });
    // }
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
          getProfileInfo();
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
        }).catch((err) => {
          console.log('getUserByUserId',err);
        });;
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
        }).catch((err) => {
          console.log('getPostsByUserId', err);
        });;
    }
    useEffect(() => {
        getPostsByUserId();
        getUserByUserId();
        getProfileInfo();
    }, []);

    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
      })
    });

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      })
    });
    
    if(overlay)
    {overlay.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal.active');
      modals.forEach(modal => {
        closeModal(modal);
      })
    });}

    function openModal(modal) {
      if (modal == null) 
          return;
      else{
        modal.classList.add('active');
        overlay.classList.add('active');
      }
    }
    function closeModal(modal) {
      if (modal == null) return

      modal.classList.remove('active');
      overlay.classList.remove('active');
    }

   return (
          <div className = "profilePage" style={{textAlign: 'center'}}>
                  <button data-modal-target="#modal">Add Profile Information</button>
                <div className='modal active' id='modal'>
                    <div className='modal-header'>
                      <div className='title'>Profile Setup</div>
                      <button data-close-button className='close-button'>&times;</button>
                    </div>
                    <div className='modal-body'>
                      <h3>Bio</h3>
                      <input type = "text" placeholder='Bio' value={bio} name = "bioCreate" onChange ={(e) => {setBio(e.target.value);}}/>
                      <button onClick={editProfileInfo}>Submit!</button>
                    </div>
                </div>
                <div id='overlay'></div>
                <div className='editingProfileInfo'>
                      <input type = "text" placeholder='Bio' value = {bio} name = "bioChange" onChange ={(e) => {setBio(e.target.value);}}/>
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
                    {profile?.map((b) => {
                        return (
                          <li key = {b} style={{
                          display: 'inline-block',
                          background: '#256ce1',
                          color: 'white',
                          border: '1px solid #ccc',
                          borderRadius: 6,
                          padding: '15 15 15 15',
                          margin: '10px 10px 0 0',
                          overflow: 'hidden',
                          width: '50%'}}>
                          <b>Bio: {b.bio}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*user information*/}
                <ul>
                    {users?.map((u) => {
                        return (
                          <li key = {u} style={{
                          display: 'inline-block',
                          background: '#256ce1',
                          color: 'white',
                          border: '1px solid #ccc',
                          borderRadius: 6,
                          padding: '15 15 15 15',
                          margin: '10px 10px 0 0',
                          overflow: 'hidden',
                          width: '50%'}}>
                          <b>Name: {u.firstname} {u.lastname}</b>
                          <br></br>
                          <b>Age: {u.age}</b>
                          <br></br>
                          <b>Gender: {u.gender}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*posts information*/}
                <ul>
                    {posts?.map((p) => {
                      return (
                        <li key = {p} style={{
                        display: 'inline-block',
                        background: '#256ce1',
                        color: 'white',
                        border: '1px solid #ccc',
                        borderRadius: 6,
                        padding: '15 15 15 15',
                        margin: '10px 10px 0 0',
                        overflow: 'hidden',
                        width: '50%'}}>
                        <b>{p.username}</b>
                        <br></br>
                        {p.body}<br></br>
                        {p.time_created}
                        </li>)
                    })}
                </ul>
          </div>
          )
}

export default Profile;
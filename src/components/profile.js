import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [users, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [body, setBody] = useState('');
    const [updatedBody, setUpdatedBody] = useState('');
    const [bio, setBio] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [pfp, setPfp] = useState([]);
    const [isEditing, setIsEditing] = useState();

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
    // Edit User Information Form
    const editUserInfo = () => {
        Axios.patch('http://localhost:3001/api/users/',
        { firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          gender: gender,
          age: age
        },
        {
          method: 'PATCH',
          mode: 'no-cors',
          headers: 
          {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          },
          withCredentials: true}
          ).then(() => {
            swal(`Success!`,"User Information Updated!", "success");
            setFirstName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setGender('');
            setAge('');
            getUserByUserId();
        }).catch(() => {
            swal(`Sorry...`, "Invalid Request", "error");
        });
    }
    // Delete Account Function
    const deleteAccount = () => {
        Axios.delete('http://localhost:3001/api/users/:suid',
        {
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true}
        ).then(() => {
          swal(`Sorry to see you go...`,"Account Deleted", "success");
          clearCookie();
          const cookies = new Cookies();
          cookies.remove('token');
          navigate('/', { replace: true });

        }).catch(() => {
          swal(`Error`, "Invalid Request", "error");
        });
    }
    // Edit profile bio and/or profile picture
    const editProfileInfo = () => {
        Axios.patch('http://localhost:3001/api/users/profile', 
        {bio: bio},
        { 
        method: 'PATCH',
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
    // Creating posts function
    const createPost = () => {
      if (body){
        Axios.post('http://localhost:3001/api/posts/post', 
        {body},
        {withCredentials: true}
        ).then(() => {
          swal('Success', "Post Successful", "success");
          setBody('');
          getPostsByUserId();
        }).catch(() => {
          swal("Error", "Could Not Post", "error");
        });
      }
      else{
        return swal("Error", "Please Enter Something", "error");
      }
  }
  // To edit post content
    const editPost = (post) => {
      setIsEditing(post);
    }
    
    const savePost = (pid) => {
        Axios.patch(`http://localhost:3001/api/posts/${pid}`,
        {body: updatedBody},
        {withCredentials: true}
        ).then(()=> {
          setIsEditing({});
          getPostsByUserId();
        }).catch(() => {
        swal("Error", "Could Not Edit", "error");
      });
    }

  // To delete post
    const deletePost = (pid) => {
        Axios.delete(`http://localhost:3001/api/posts/${pid}`, 
        {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          withCredentials: true}
        ).then(() => {
          getPostsByUserId();
        }).catch(() => {
          swal("Error", "Could Not Delete", "error");
          console.log('did not delete');
        });
    }
    // To only get posts for user logged in, (profile posts)
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
    // Clear server cookie function
    const clearCookie = () => {
        Axios.get("http://localhost:3001/api/users/logout", 
        {
          withCredentials: true
        });
    }
    // Renders the page on change of anything specified in here
    useEffect(() => {
        getPostsByUserId();
        getUserByUserId();
        getProfileInfo();
    }, []);


    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        createPost();
        e.preventDefault();      
      }
    }

   return (
          <div className = "profilePage" style={{textAlign: 'center'}}>
            <h1>Profile</h1>
                <div className='editingProfileInfo'>
                      <input type = "text" placeholder='Bio' value={bio} name="bioChange" onChange ={(e) => {setBio(e.target.value);}}/>
                      <br></br>
                      <button onClick={editProfileInfo}>Submit!</button>
                    </div>
                <div className='postForm'>
                    <input type='text' onKeyDown={handleKeyDown} placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                    <br></br>
                    <br></br>
                    <button onClick={createPost}>Post</button>
                </div>
                {/*profile information*/}
                <ul>
                    {profile.map((profile, p) => {
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
                          <b>Bio: {profile?.bio}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*user information*/}
                <ul>
                    {users.map((user, u) => {
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
                          <b>Name: {user?.firstname} {user?.lastname}</b>
                          <br></br>
                          <b>Age: {user?.age}</b>
                          <br></br>
                          <b>Gender: {user?.gender}</b>
                          <br></br>
                          </li>)
                    })}
                </ul>
                {/*posts information*/}
                <ul>
                    {posts.map((post, p) => {
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
                        <b>{post?.username}</b>
                        <br/>


                        {isEditing?.pid === post.pid ? (
                          <input
                            name="editPost"
                            type="text"
                            placeholder="Edit Post"
                            onChange ={(e) => {setUpdatedBody(e.target.value);}
                            
                          }
                          />
                        ) : (
                        post.body )}


                        <br/>
                        {post?.time_updated ? post.time_updated : post.time_created}
                        <br></br>
                        {isEditing?.pid === post.pid ? <div> 
                          <button onClick={() => savePost(post.pid)}>Save</button>
                          <button onClick={() => setIsEditing({})}>Cancel</button> 
                        </div> : 
                        <div>
                          <button onClick={() => deletePost(post.pid)}>Delete</button>
                          <button onClick={() => editPost(post)}>Edit</button>
                        </div>
                      }
                        </li>)
                    })}
                </ul>
          </div>
          )
}
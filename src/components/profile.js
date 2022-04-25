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

   /* const addProfileInfo = () => {
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
    }*/
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
    /*const editProfileInfo = () => {
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
    }*/
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
  // To set isEditing state to true
    const editPost = (post) => {
      setIsEditing(post);
      setUpdatedBody(updatedBody);
    }
    // To save edited changes of post
    const savePost = (pid) => {
        Axios.patch(`http://localhost:3001/api/posts/${pid}`,
        {body: updatedBody},
        {withCredentials: true}
        ).then(()=> {
          swal('Success', "Updated Successfully", "success");
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
          swal('Success', "Deleted Successfully", "success");
          getPostsByUserId();
        }).catch(() => {
          swal("Error", "Could Not Delete", "error");
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
        //getProfileInfo();
    }, []);


    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        createPost();    
      }
    }

   return (
          <div className = "profilePage" style={{textAlign: 'center'}}>
            <div className= "userInfo">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen"></link>   
            <h1>Welcome to your profile page!</h1>
                  {/*user information*/}
                <ul>
                    {users.map((user, u) => {
                        return (
                          <li key = {u} style={{
                            display: 'block',
                            color: 'white',
                            margin: '0 auto 15 auto',
                            overflow: 'hidden',
                            width: '40em'}}>
                           <div className=  "allUserInfo">
                              <div className= "subject">
                                <b>Name:</b>
                                <br></br>
                                <b>Age:</b> 
                                <br></br>
                                <b>Gender:</b> 
                              </div>
                              <div className=  "info">
                                <i>{user?.firstname} {user?.lastname}</i>
                                <br></br>
                                <i>{user?.age}</i>
                                <br></br>
                                <i>{user?.gender}</i>
                              </div>
                          </div>   
                          </li>)
                    })}
                </ul>
                </div>
                    <input type='text' onKeyDown={handleKeyDown} placeholder='Something on your mind?' value={body} name='postContent' onChange ={(e) => {setBody(e.target.value);}}/>
                    <br></br>
                    <button onClick={createPost}>POST</button>
                {/*posts information*/}
                <ul>
                    {posts.map((post, p) => {
                      return (

                        <li key = {p} style={{
                          display: 'block',
                          background: 'linear-gradient(47deg, rgba(113,152,155,1) 0%, rgba(68,102,111,1) 27%, rgba(28,57,72,1) 100%)',                                
                          color: 'white',
                          border: '1px solid #71989b',
                          borderRadius: '10px',
                          padding: '15 .5em 5 .5em',
                          margin: '0 auto 15 auto',
                          overflow: 'hidden',
                          width: '40em',
                          boxShadow: '0 0 3px #17303c5d'}}>
                            <div className= "user">
                        <b>{post?.username}</b>
                        </div>

                       <p> {
                        post.time_updated ? 
                        post.time_updated 
                        : 
                        post.time_created}</p>
                        <br></br>
                       <div className="editPost">
                          {isEditing?.pid === post.pid ? (
                          <textarea
                            name="editPost"
                            onKeyDown={handleKeyDown}
                            value ={post.body}
                            type="text"
                            placeholder="Edit Post"
                            onChange ={(e) => {setUpdatedBody(e.target.value);}}
                          />
                        ) : (
                        post.body )}
                        </div>
                        {isEditing?.pid === post.pid ? <div> 
                          <div className="save"><button onClick={() => savePost(post.pid)}>SAVE</button></div>
                          <div className="cancel"><button onClick={() => setIsEditing({})}>CANCEL</button></div>
                        </div> 
                        : 
                        <div>
                          <div className='delete'>
                             <button onClick={() => deletePost(post.pid)}>DELETE</button>
                          </div>
                          <div className='edit'>
                             <button onClick={() => editPost(post)}>EDIT</button>
                          </div>
                        </div>
                      }
                        </li>)
                    })}
                </ul>
          </div>
          )
}
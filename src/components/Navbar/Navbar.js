import React, { useEffect, useState } from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, LoginNavBtnLink, LogoutNavBtnLink} from './navbarElements'
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

     const [cookie, setCookie] = useState('');
     const navigate = useNavigate();

     // Logout clears all cookies from frontend and from backend
     // Side note: Frontend cookie is for NavBar change while Backend cookie is for resources.
     function logout () {
          clearCookie();
          const cookies = new Cookies();
          cookies.remove('token');
     } 

     //Used to clear 'authorization' cookie generated from server
     const clearCookie = () => {
          Axios.get("http://localhost:3001/api/users/logout", 
          {
            withCredentials: true
          }).then(() => {
               navigate('/login', { replace: true })
          });
      }

     
     useEffect(() => {
          const cookies = new Cookies();
          setCookie(cookies.get('token'));
     },[]);

     return (
          <>
          {cookie ? 
                    <Nav>
                         <NavLink to = '/home'>
                              <h1>Sociable</h1>
                         </NavLink>
                         <Bars />
                         <NavMenu>
                              <NavLink to = "/home">
                                   Home
                              </NavLink>
                              <NavLink to = "/about">
                                   About
                              </NavLink>
                              <NavLink to = "/contact">
                                   Contact
                              </NavLink>
                              <NavLink to = "/userProfile">
                                   Profile
                              </NavLink>
                         </NavMenu>
                         <NavBtn onClick={logout}>
                              <LogoutNavBtnLink to='/login'>Logout</LogoutNavBtnLink>
                         </NavBtn>
                    </Nav>
                    : // Above Navbar displays if cookie exists (logged in) Below NavBar displays if cookie doesn't exist (logged out)
                    <Nav>
                         <NavLink to = '/'>
                              <h1>Sociable</h1>
                         </NavLink>
                         <Bars />
                         <NavMenu>
                              <NavLink to = "/">
                                   SignUp
                              </NavLink>
                              <NavLink to = "/about">
                                   About
                              </NavLink>
                              <NavLink to = "/contact">
                                   Contact
                              </NavLink>
                         </NavMenu>
                         <NavBtn>
                         <LoginNavBtnLink to='/login'>Login</LoginNavBtnLink>
                         </NavBtn>
                    </Nav>
          }
          </>
     );
};

export default Navbar;
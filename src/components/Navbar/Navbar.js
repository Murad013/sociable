import React, { useEffect, useState } from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navbarElements'
import Cookies from 'universal-cookie';

const Navbar = () => {

     const [cookie, setCookie] = useState('');

     function logout () {
          const cookies = new Cookies();
          cookies.remove('token');
     } 

     function createCookie() {
          const cookies = new Cookies();
          return setCookie(cookies.get('token'));
     }
     
     useEffect(() => {
          createCookie();
     },[cookie]);

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
                              <NavBtnLink to='/login'>Logout</NavBtnLink>
                         </NavBtn>
                    </Nav>
                    : 
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
                         <NavBtnLink to='/login'>Login</NavBtnLink>
                         </NavBtn>
                    </Nav>
          }
          </>
     );
};

export default Navbar;
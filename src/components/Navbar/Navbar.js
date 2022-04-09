import React, { useEffect, useState } from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navbarElements'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

function logout () {
     const cookies = new Cookies();
     cookies.remove('token');
} 

const Navbar = () => {

     const [cookie, setCookie] = useState('')
     
     useEffect(() => {
          const cookies = new Cookies();
          setCookie(cookies.get('token'))
     },[]);

     return (
          <>
          <Nav>
               <NavLink to = '/'>
                    <h1>Sociable</h1>
               </NavLink>
               <Bars />
               <NavMenu>
                    <NavLink to = "/">
                         SignUp
                    </NavLink>
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
                    <NavLink onClick={logout} to = "/login">
                         Logout
                    </NavLink>
               </NavMenu>
               {cookie ? 
                         ''
                         : <NavBtn>
                              <NavBtnLink to='/login'>Login</NavBtnLink>
                         </NavBtn>}

          </Nav>
          </>
     );
};

export default Navbar;
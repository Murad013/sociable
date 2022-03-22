import React from 'react';
import {
     Nav,
     NavLink,
     Bars,
     NavMenu,
     NavBtn,
     NavBtnLink
   } from './NavbarElements'

const Navbar = () => {
     return (
          <>
          <Nav>
               <NavLink to = '/'>
                    <h1>Logo</h1>
               </NavLink>
               <Bars />
               <NavMenu>
                    <NavLink to = "/" activeStyle>
                         SignUp
                    </NavLink>
                    <NavLink to = "/login" activeStyle>
                         Login
                    </NavLink>
                    <NavLink to = "/home" activeStyle>
                         Home
                    </NavLink>
                    <NavLink to = "/" activeStyle>
                         Profile
                    </NavLink>
               </NavMenu>
          </Nav>
          </>
     );
};

export default Navbar;
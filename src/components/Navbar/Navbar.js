import React from 'react';
import {
     Nav,
     NavLink,
     Bars,
     NavMenu,
     NavBtn,
     NavBtnLink
   } from './navbarElements'

const Navbar = () => {
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
                    <NavLink to = "/login">
                         Logout
                    </NavLink>
               </NavMenu>
               <NavBtn>
                    <NavBtnLink to='/login'>Login</NavBtnLink>
               </NavBtn>
          </Nav>
          </>
     );
};

export default Navbar;
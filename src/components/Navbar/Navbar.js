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
                    <NavLink to = "/" activeStyle>
                         SignUp
                    </NavLink>
                    <NavLink to = "/about" activeStyle>
                         About
                    </NavLink>
                    <NavLink to = "/contact" activeStyle>
                         Contact
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
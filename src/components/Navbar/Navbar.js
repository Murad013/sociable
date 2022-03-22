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
                    <NavLink to = "/" activeStyle>
                         About
                    </NavLink>
                    <NavLink to = "/" activeStyle>
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
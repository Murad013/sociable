import {Nav, NavLink, Bars, NavMenu, NavBtn, LogoutNavBtnLink} from './NavbarElements'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

     const navigate = useNavigate();

     // Logout clears all cookies from frontend and from backend
     function logout () {
          clearCookie();
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
     return (
          <>
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
          </>
     );
}
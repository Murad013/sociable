import "./styles/App.css"
import React from 'react';
import SignUp from './components/signup';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {

    //  const getUsers = () => {
    //       Axios.get("http://localhost:3001/api/users/").then((response) => {
    //         setUserList(response.data);
    //       });
    //     };

    //     const deleteUser = (id) => {
    //       Axios.delete(`http://localhost:3001/api/users/${id}`).then((response) => {
    //         setUserList(
    //           userList.filter((val) => {
    //             return val.id !== id;
    //           })
    //         );
    //       });
    //     };

        return (
          <Router>
            <Routes>
              <Route exact path="/" element={<SignUp />} />
            </Routes>
          </Router>

     );
}

export default App;
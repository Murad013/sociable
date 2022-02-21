import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
     return (
          <div className='Home'>

          <h1>Welcome!</h1>
          <Link to={"/login"}><button>Logout!</button></Link>
          </div>
     )
}

export default Home;
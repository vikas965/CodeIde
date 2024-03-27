import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    navigate('/login');
    console.log('Logout successful!');
    // Redirect or perform other actions after successful logout
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // If user is not logged in, navigate to the login page
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // if (!isLoggedIn) {
  //   // Return null or a loading message while navigating
  //   return <p>Loading...</p>;
  // }

  return (
    <div className='table-home'>
      <center>
        <div className="buttons" style={{ display: "flex" }}>
          <h1 className="text-center"><Link to="/adduser"><button className='btn btn-primary m-3'>Add User</button></Link></h1>
          <h1 className="text-center"><Link to="/addnotes"><button className='btn btn-primary m-3'>Add notes</button></Link></h1>
          <h1 className="text-center"><Link to="/shownotes"><button className='btn btn-success m-3'>Show notes</button></Link></h1>
          {isLoggedIn && <h1 className="text-center"><button onClick={handleLogout} className='btn btn-danger m-3'>Logout</button></h1>}
        </div>
      </center>
    </div>
  );
}

export default Home;

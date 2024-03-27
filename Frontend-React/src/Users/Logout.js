import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    console.log('Logout successful!');
    // Redirect or perform other actions after successful logout
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

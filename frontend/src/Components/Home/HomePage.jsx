import React from 'react'
import "./HomePage.css"
const HomePage = () => {

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

  return (
    <div className="homePage">
      <h1>HomePage</h1>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default HomePage
import React, { useState } from 'react';
import './uppernavbar.css';

const UpperNavbar = ({ userName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="upper-navbar">
      <div className="profile-info">
        <img
          src="profile-image.jpg"
          alt="profile"
          style={{ width: '30px', borderRadius: '50%', marginRight: '5px' }}
        />
        <span>{userName}</span>
      </div>
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          Options
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#profile">Profile Info</a>
            <a className="dropdown-item" href="#change-password">Change Password</a>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpperNavbar;

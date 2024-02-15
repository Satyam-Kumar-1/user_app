import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../URL';
import Cookies from 'js-cookie';

const SideNavbar = () => {
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('user');
        if (!token) {
          navigate('/login');
          return; // No token found, exit early
        }

        const response = await fetch(`${BASE_URL}/user/api/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        setUserName(userData.name);
        setProfileImage(userData.profile_image); // Assuming profile image is provided in the response
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Include navigate in dependency array to avoid missing it

  const handleLogout = () => {
    // Remove the user cookie
    Cookies.remove('user');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div style={{ width: '250px', backgroundColor: '#f8f9fa', height: '100vh', position: 'fixed', top: '0' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
        <img
          src={`${BASE_URL}/${profileImage}` || '/images/default.png'} // Use profile image if available, otherwise fallback to default image
          alt="profile"
          style={{ height: '114px', width: '122px', borderRadius: '50%', marginBottom: '10px' }}
        />
        <div>{userName}</div>
      </div>
      <Nav className="flex-column" style={{ marginTop: '20px' }}>
        <Nav.Link as={NavLink} to="/user-account" className="nav-link" active={location.pathname === '/user-account'} style={{ marginBottom: '5px' }}>User Account</Nav.Link>
        <Nav.Link as={NavLink} to="/user-profile" className="nav-link" active={location.pathname === '/user-profile'} style={{ marginBottom: '5px' }}>Profile Info</Nav.Link>
        <Nav.Link as={NavLink} to="/change-password" className="nav-link" active={location.pathname === '/change-password'} style={{ marginBottom: '5px' }}>Change Password</Nav.Link>
        <Nav.Link as={NavLink} to="/add-image" className="nav-link" active={location.pathname === '/add-image'} style={{ marginBottom: '5px' }}>Add Image</Nav.Link>
        <Nav.Link as={NavLink} to="/display-image" className="nav-link" active={location.pathname === '/display-image'} style={{ marginBottom: '5px' }}>Uploaded Image</Nav.Link>
        <Nav.Link className="nav-link" onClick={handleLogout} style={{ marginBottom: '5px' }}>Logout</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideNavbar;

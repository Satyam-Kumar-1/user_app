import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../URL';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { Container } from "react-bootstrap";

const UserAccountPage = () => {

  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('user');
        if (!token) {
          navigate('/login');
          return;
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
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <h1 className="display-1 font-weight-bold">Welcome {userName}</h1>
            </div>
    </Container>
  );
};

export default UserAccountPage;

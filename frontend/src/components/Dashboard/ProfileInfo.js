import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../URL';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        setUserEmail(userData.email);
        setUserPhone(userData.phone);
        setProfileImage(userData.profile_image);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement logic to submit updated profile information
    setIsSubmitting(true);
    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setIsEditing(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Row className="align-items-center justify-content-center mt-4">
      <Col sm={12} md={6}>
        <Card className="shadow-sm mt-5">
          <Card.Body>
            {!isEditing ? (
              <>
                <Card.Title>Profile Information</Card.Title>
                <Card.Img src={`${BASE_URL}/${profileImage}` || '/images/default.png'} alt="Profile" className="rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                <Card.Text><strong>Name:</strong> {userName}</Card.Text>
                <Card.Text><strong>Email:</strong> {userEmail}</Card.Text>
                <Card.Text><strong>Phone:</strong> {userPhone}</Card.Text>
                <Button variant="primary" onClick={handleEditClick} className="mr-2">Edit</Button>
              </>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Card.Title>Edit Profile</Card.Title>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter phone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="mr-2" style={{ marginTop: '10px' }} disabled={isSubmitting}>Submit</Button>
                <Button variant="secondary" onClick={handleCancelClick} style={{ marginTop: '10px' }}>Cancel</Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileInfo;

import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ChangePassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('user');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Row className="justify-content-center mt-4">
      <Col sm={12} md={6}>
        <div className="p-4 border rounded shadow">
          <h2>Change Password</h2>
          <p>Currently unavailable.</p>
          {/* You can add a form here for changing password */}
        </div>
      </Col>
    </Row>
  );
};

export default ChangePassword;

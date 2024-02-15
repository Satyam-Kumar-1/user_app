import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate} from "react-router-dom"; // Import useHistory for navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';

import { BASE_URL } from "../../../URL";

export default function Login() {
  const navigate = useNavigate(); // Initialize useHistory for navigation

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseData = await response.json();
      
        throw new Error(responseData.error);
      }

      const responseData = await response.json();

      if(responseData.token){
        Cookies.set('user', responseData.token);
      }

      // Navigate to /user-account/
      navigate('/user-account/');
    } catch (error) {
      toast.error(error.message);
      //console.error('There was a problem with the fetch operation:', error);
      // Handle error, show alert or any other appropriate action
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <hr className="my-4" />
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={formData.showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text onClick={handleShowPassword}>
                      {formData.showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 mt-3">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              <p className="text-center mt-3">
                Not registered? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-right" />
    </Container>
  );
}

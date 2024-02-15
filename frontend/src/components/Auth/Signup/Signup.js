import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup, Image } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_URL } from "../../../URL";

export default function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    profileImage: null, // New state for profile image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = (e) => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleShowConfirmPassword = (e) => {
    setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Password do not match")
      // alert("Passwords do not match");
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.warning("Invalid email ")
      // alert("Invalid email format");
      return;
    }
  
    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.warning("Invalid phone number")
      // alert("Invalid phone number format");
      return;
    }


    // Create FormData object
  const formDataToSend = new FormData();
  formDataToSend.append('fullName', formData.fullName);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('confirmPassword', formData.confirmPassword);
  formDataToSend.append('profileImage', formData.profileImage);

  try {
    const response = await fetch(`${BASE_URL}/user/api/signup`, {
      method: 'POST',
      body: formDataToSend, // Use FormData object instead of JSON.stringify(formData)
    });

    if (!response.ok) {
      const responseData = await response.json();
      
      throw new Error(responseData.error);
      
    }

    const responseData = await response.json();
    toast.success("Registered Successfully");
    // console.log(responseData);
    // After successful form submission, navigate to /login
    navigate('/login');
    
    // Optionally, you can handle success or further processing here
  } catch (error) {
    toast.error(error.message);
    //console.error('There was a problem with the fetch operation:', error);
    // Handle error, show alert or any other appropriate action
  }
  
    // try {
    //   const response = await fetch('http://localhost:5000/user/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const responseData = await response.json();
    //   console.log(responseData);
      
    //   // Optionally, you can handle success or further processing here
    // } catch (error) {
    //   console.error('There was a problem with the fetch operation:', error);
    //   // Handle error, show alert or any other appropriate action
    // }
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <div className="card shadow">
            <div className="card-body">
             
              <h2 className="text-center mb-4">Sign Up</h2>
              <hr className="my-4" />
              <Form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <Image
                  src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : process.env.PUBLIC_URL + "/images/people-icon-default.png"}
                  alt="Profile"
                  roundedCircle
                  width={150}
                  height={150}
                  className="mb-3"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
              </div>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

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

                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
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

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={formData.showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text onClick={handleShowConfirmPassword}>
                      {formData.showConfirmPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 mt-3">
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <p className="text-center mt-3">
            Already registered? <a href="/login">Sign in</a>
          </p>
        </Col>
      </Row>
      <ToastContainer position="top-right" />
    </Container>
  );
}

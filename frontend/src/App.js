import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import NotFoundPage from './components/NotFoundPage';
import UserAccountPage from './components/Dashboard/UserAccountPage';
import ProfileInfo from './components/Dashboard/ProfileInfo';
import ChangePassword from './components/Dashboard/ChangePassword';
import Navbar from './components/Navbar/Navbar';
import SideNavbar from './components/Dashboard/SideNavbar';
import AddImage from './components/Dashboard/AddImage';
import DisplayImage from './components/Dashboard/displayImages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navbar for Home, Signup, and Login routes */}
        <Route path="/" element={<>
          <Navbar />
          <Home />
        </>} />
        <Route path="/signup" element={<>
          <Navbar />
          <Signup />
        </>} />
        <Route path="/login" element={<>
          <Navbar />
          <Login />
        </>} />
        <Route path="/contact" element={<>
          <Navbar />
          <Home />
        </>} />
        {/* Routes with SideNavbar */}
        <Route path="/user-account/*" element={<>
          <SideNavbar />
          <UserAccountPage />
        </>} />
        <Route path="/user-profile/*" element={<>
          <SideNavbar />
          <ProfileInfo />
        </>} />
        <Route path="/change-password/*" element={<>
          <SideNavbar />
          <ChangePassword />
        </>} />
        <Route path="/add-image/*" element={<>
          <SideNavbar />
          <AddImage/>
        </>} />
        <Route path="/display-image/*" element={<>
          <SideNavbar />
          <DisplayImage/>
        </>} />
        
        {/* Not Found route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const models=require('../models');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
// Import and configure dotenv to load environment variables
require('dotenv').config();


exports.createUser= async (req,res)=>{
    try {
        console.log("data is" ,req.body);
        const { fullName, email, phone, password } = req.body;
        // Check if email is already registered
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already registered' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Normalize profile image path
        const normalizedProfileImagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
        // Create a new user record
        const newUser = await models.User.create({
          name:fullName,
          email,
          phone,
          password: hashedPassword,
          profile_image:normalizedProfileImagePath
          
        });
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      // Generate token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Change the secret key and expiration time according to your preferences
      // Exclude password from user object
      const { password: _, ...userData } = user.toJSON();
      // Return user details and token on successful login
      res.status(200).json({ message: 'Login successful', user: userData, token });
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.fetchProfile = async (req, res) => {
    try {
      const user = req.user; // This is attached by the middleware
      const userProfile = {
        name: user.name,
        email: user.email,
        phone:user.phone,
        profile_image:user.profile_image
      };
      return res.status(200).json(userProfile);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch user profile.' });
    }
  };
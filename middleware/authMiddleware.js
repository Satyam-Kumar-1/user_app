// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require('../models'); // assuming you have a User model

const authMiddleware = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication failed. Token missing or invalid.' });
      }
      const token = authorizationHeader.split(' ')[1]; // Remove "Bearer" prefix
    //   console.log("token is ", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded data is ",decoded);
      const user = await models.User.findByPk(decoded.userId);

      console.log("user is ",user);
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
      }
      req.user = user; // Attach the user object to the request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
  };
  

module.exports = authMiddleware;

// uploadMiddleware.js - Middleware for handling file uploads

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads/profile_image directory exists
const uploadDirectory = './uploads/profile_image';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const uploadProfileImage = multer({
  storage: storage
}).single('profileImage');

module.exports = uploadProfileImage;

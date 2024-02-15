// uploadMiddleware.js - Middleware for handling file uploads

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads/images directory exists
const uploadDirectory = './uploads/images';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set storage engine for images
const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload for images
const uploadImages = multer({
  storage: storage
}).single('image');

module.exports = uploadImages;

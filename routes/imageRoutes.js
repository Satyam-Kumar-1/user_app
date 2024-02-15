// imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadImageMiddleware');

// Route to add an image
router.post('/add-image', authMiddleware, upload, imageController.addImage);

// Route to fetch images associated with a user
router.get('/fetch-images', authMiddleware, imageController.fetchImages);

module.exports = router;

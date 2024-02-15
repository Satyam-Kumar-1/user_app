// imageController.js
const models = require('../models');

// Controller method to add an image
exports.addImage = async (req, res) => {
    try {
        console.log(req.body);
        // Get user ID from the decoded token
        const userId = req.user.id;

        // Get image path from multer
        const imagePath =req.file.path.replace(/\\/g, '/');

        // Create the image record
        await models.Image.create({
            user_id: userId,
            image_path: imagePath
        });

        res.status(201).json({ message: 'Image added successfully' });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller method to fetch images associated with a user
exports.fetchImages = async (req, res) => {
    try {
        // Get user ID from the decoded token
        const userId = req.user.id;

        // Fetch images associated with the user ID
        const images = await models.Image.findAll({
            where: {
                user_id: userId
            }
        });

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

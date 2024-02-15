const express=require('express');
const router=express.Router();


const userController=require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware=require('../middleware/authMiddleware');


router.post('/signup',upload,userController.createUser);
router.post('/login',userController.login);
router.get('/profile', authMiddleware, userController.fetchProfile);
module.exports=router;
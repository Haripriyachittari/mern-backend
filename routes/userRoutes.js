const express=require('express');
const router=express.Router();
const {protectGetUser}=require('../middleware/authMiddleware')

const userControllers=require('../controllers/userControllers')


router.post('/',userControllers.registerUser)
router.post('/socialregister',userControllers.socialRegister)
router.post('/sociallogin',userControllers.socialLogin)
router.post('/login',userControllers.loginUser)
router.get('/me', protectGetUser, userControllers.getUser)


module.exports=router;
import express from 'express';
import { getAllUsers, updatePassword, updateUser, userLogin, userRegister,getUserDetails, getStats, getLoginUser } from '../controller/userController.js';
import { isAdmin, userAuth } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

//Register user
router.post('/register',userRegister)

//Login user
router.post('/login',userLogin)

//Update Password route || PATCH
router.patch('/updatePassword',userAuth,updatePassword)

//Update user details route ||PATCH
router.patch('/update/:id',userAuth,upload.single('image'),updateUser)

//Get all users route || get
router.get('/all-users',userAuth,isAdmin,getAllUsers)

//Get All Stats
router.get("/get-stats",userAuth,isAdmin,getStats)

//Get Login User
router.get("/get-login-user/:id",userAuth,getLoginUser)

//Get user details and appointment details || Get
router.get('/get-user-details/:id',userAuth,isAdmin,getUserDetails)

export default router;
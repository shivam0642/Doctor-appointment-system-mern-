import express from 'express';
import { requireSignIn } from '../middlewares/requireSignIn.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import { addDoctor, deleteDoctor, getAllDoctors, getDoctorDetails, updateDoctor, updateDoctorAvailability } from '../controller/doctorController.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

//ADD DOCTOR || POST
router.post('/addDoctor',requireSignIn,isAdmin,upload.single('image'),addDoctor);

//Get all Doctors || GET
router.get('/getAllDoctors',getAllDoctors);

//Get doctor details || GET
router.get('/getDoctorDetails/:id',getDoctorDetails)

//UPDATE DOCTOR || PATCH
router.patch('/updateDoctor/:id',requireSignIn,isAdmin,upload.single('image'),updateDoctor)

//DELETE DOCTOR || DELETE 
router.delete('/deleteDoctor/:id',requireSignIn,isAdmin,deleteDoctor)

//UPDATE DOCTOR AVAILABILITY || PATCH
router.patch('/updateDoctorAvailability/:id',requireSignIn,isAdmin,updateDoctorAvailability)

export default router;
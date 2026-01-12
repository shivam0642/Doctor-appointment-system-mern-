import express from "express";
import { isAdmin, userAuth } from "../middlewares/authMiddleware.js";
import { cancelAppointment, createAppointment, getAllAppointments, getAppointmentDetails, getUserAppointmentDetails, getUserAppointments, updateAppointmentStatus } from "../controller/appointmentController.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";

const router = express.Router();

//CREATE APPOINTMENT || POST
router.post("/createAppointment",userAuth,createAppointment)

//GET ALL APPOINTMENTS ROUTE || GET
router.get("/getAllAppointments",requireSignIn,isAdmin,getAllAppointments)

//Get Appointment Details ||get
router.get("/getAppointmentDetails/:id",requireSignIn,getAppointmentDetails)

//UPDATE APPOINTMENT STATUS || PATCH
router.patch("/updateAppointmentStatus/:id",requireSignIn,isAdmin,updateAppointmentStatus);

//GET USER APPOINTMENTS || GET
router.get("/getUserAppointments/:id",userAuth,getUserAppointments);

//GET USER APPOINTMENTS DETAILS || GET
router.get("/getUserAppointmentDetails/:id",userAuth,getUserAppointmentDetails)

//CANCEL APPOINTMENT || PATCH
router.patch("/cancelAppointment/:id",userAuth,cancelAppointment);

export default router;

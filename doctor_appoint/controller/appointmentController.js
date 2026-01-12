import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//  create new appointment
const createAppointment = async(req,res)=>{
    try {
        const {userId,doctorId,amount,slotDate,slotTime} = req.body
        if(!userId || !doctorId || !amount || !slotDate || !slotTime){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
            })
        }

        const appointment = new appointmentModel({
            userId,
            doctorId,
            amount,
            slotDate,
            slotTime
        });
        await appointment.save();
        res.status(201).send({
            success:true,
            message:"Appointment created successfully",
            appointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Create Appointment Controller",
            error:error.message
        })
    }
}

//GET ALL APOINTMENTS
const getAllAppointments = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.status(200).send({
            success:true,
            message:"All Appointments fetched successfully",
            totalCount:appointments.length,
            appointments
        })
    } catch (error) {
       console.log(error);
       res.status(500).send({
          success:false,
          message:"Error in get all appointment controller",
          error:error.message
       }) 
    }
}

//Get Details
const getAppointmentDetails = async (req,res)=>{
    try {
       const {id} = req.params
       if(!id)
        {
            return res.status(404).send({
                success:false,
                message:"Please provide the appointment id"
            })
        }  
      const appointment = await appointmentModel.findById(id);
      if(!appointment)
      {
        return res.status(404).send({
            success:false,
            Message:"There is no Appointment for this id"
        })
      }

      //Find user and doctor
      const user = await userModel.findOne({_id:appointment?.userId})
      const doctor = await doctorModel.findOne({_id:appointment?.doctorId})

      res.status(200).send({
         success:true,
         message:"Appointment details fetched successfully",
         appointmentDetails:{
            clientName:user?.name,
            clientPhone:user?.phone,
            clientEmail:user?.email,
            doctorName:doctor?.name,
            doctorPhone:doctor?.phone,
            doctorEmail:doctor?.email,
            bookingDate:appointment?.slotDate,
            bookingTime:appointment?.slotTime,
            amount:appointment?.amount,
            bookingStatus:appointment?.status,
            paymentMode:appointment?.payment,
            createdAt:appointment?.createdAt
         }
      })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get Appointment Details Controller",
            error:error.message
        })
    }
}

//Change Appointment Status
const updateAppointmentStatus = async (req,res)=>{
    try {
        const {id} = req.params
        if(!id)
        {
            return res.status(404).send({
                success:false,
                message:"Please Provide Appointment Id"
            })
        }
        const {status} = req.body
        if(!status)
            {
                return res.status(400).send({
                    success:false,
                    message:"Please provide the Appointment status"
                })
            }

         const appointment = await appointmentModel.findByIdAndUpdate(id,{$set:{status:status}},{new:true})
         res.status(200).send({
            success:true,
            message:"Appointment status updated successfully",
            appointment
         }) 
        
    } catch (error) {
       console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update Appointment Status Controller",
            error:error.message
        })    }
}

//GET USER APPOINTMENT CONTROLLER
const getUserAppointments = async (req,res)=>{
    try {
        const {id} = req.params
        if(!id)
        {
            return res.status(404).send({
                success:false,
                message:"Please provide User Id"
            })
        }

        const user = await userModel.findById(id);
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        const appointments = await appointmentModel.find({userId:user?._id})
        res.status(200).send({
            success:true,
            message:"User Appointments fetched successfully",
            totalCount:appointments.length,
            appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get User Appointments Controller",
            error:error.message
        })
    }
}

//GET USER APPOINTMENT DETAILS CONTROLLER
const getUserAppointmentDetails = async (req,res)=>{
    try {
       const {id} = req.params
       if(!id)
        {
            return res.status(404).send({
                success:false,
                message:"Please provide the appointment id"
            })
        }  
        const user = await userModel.findById(id)
     
      if(!user)
      {
        return res.status(404).send({
            success:false,
            Message:"No user is found with this id"
        })
      }

      //Find appointment and doctor

       const appointment = await appointmentModel.findOne({userId:user?._id});
      
      const doctor = await doctorModel.findOne({_id:appointment?.doctorId})

      res.status(200).send({
         success:true,
         message:"Appointment details fetched successfully",
         appointmentDetails:{
            doctorName:doctor?.name,
            doctorPhone:doctor?.phone,
            doctorEmail:doctor?.email,
            bookingDate:appointment?.slotDate,
            bookingTime:appointment?.slotTime,
            amount:appointment?.amount,
            bookingStatus:appointment?.bookingStatus,
            paymentMode:appointment?.payment,
            createdAt:appointment?.createdAt
         }
      })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get Appointment Details Controller",
            error:error.message
        })
    }
}

//UPDATE USER BOOKING STATUS CONTROLLER
const cancelAppointment = async (req,res)=>{
    try {
       const {id} = req.params
       if(!id)
        {
            return res.status(404).send({
                success:false,
                Message:"Please provide the appointment id"
            })
        }
        
        const appointment = await appointmentModel.findById(id)
        if(!appointment)
        {
            return res.status(404).send({
                success:false,
                Message:"There is no Appointment for this id"
            })
        }

        await appointment.updateOne({$set:{status:'Cancelled'}})
        res.status(200).send({
            success:true,
            Message:"Appointment cancelled successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            Message:"Error in Cancel Appointment Controller"
        })
    }
}

export {createAppointment,getAllAppointments,getAppointmentDetails,updateAppointmentStatus,getUserAppointments,getUserAppointmentDetails,cancelAppointment};
import doctorModel from "../models/doctorModel.js";

//ADD DOCTOR CONTROLLER
const addDoctor = async(req,res)=>{
    try {
        const {name,about,degree,email,fees,gender,phone,address,image,specialization,experience,dob} = req.body;

        //validation
        if(!name || !about || !degree || !email || !fees){
            return res.status(400).send({
                success:false,
                message:"Please fill all required fields"
            })
        }

        const existingDoctor = await doctorModel.findOne({email});

        if(existingDoctor){
            return res.status(200).send({
                success:false,
                message:"Doctor already exists"
            })
        }

        let imageBase64 = null

        if(req.file)
        {
            imageBase64 = req.file.buffer.toString('base64');
        }

        const doctorData = {name,email,degree,fees,about,gender,phone,address,image:imageBase64,specialization,experience,dob}
        const doctor = new doctorModel(doctorData);
        await doctor.save();

        res.status(201).send({
            success:true,
            message:"Doctor added successfully",
            doctor
        })
    } catch (error) {
       console.log(error);
       res.status(500).send({
           success:false,
           message:"Error in Add Dcotor controller",
           error:error.message
       })  
    }
}

//GET ALL DOCTORS CONTROLLER
const getAllDoctors = async (req,res)=>{
    try {
        const doctors = await doctorModel.find().sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"All Dctors fetched successfully",
            totalCount:doctors.length,
            doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get All Doctors Controller",
            error:error.message
        })
    }
}

//GET DOCTOR DETAILS CONTROLLER
 const getDoctorDetails = async(req,res)=>{
    try {
        const {id} = req.params

        if(!id){
            return res.status(404).send({
                success:false,
                message:"Doctor id is required"
            })
        }
        
        //Find doctor by id
        const doctor = await doctorModel.findById(id);
        if(!doctor){
            return res.status(404).send({
                success:false,
                message:"Doctor not found"
            })
        }

       res.status(200).send({
          success:true,
            message:"Doctor details fetched successfully",
            doctor
       }) 

    } catch (error) {
       console.log(error);
       res.status(500).send({
          success:false,
          message:"Error in Get Doctor Details Controller",
          error:error.message
       })
    }
 } 

 //Update Doctor Controller
 const updateDoctor = async(req,res)=>{
     try {
    const doctorId = req.params.id;

    if (!doctorId) {
      return res.status(400).send({
        success: false,
        message: "Doctor ID is required",
      });
    }

    const {
      name,
      about,
      degree,
      fees,
      gender,
      phone,
      address,
      specialization,
      experience,
      dob,
    } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (about) updateData.about = about;
    if (degree) updateData.degree = degree;
    if (fees) updateData.fees = fees;
    if (gender) updateData.gender = gender;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (specialization) updateData.specialization = specialization;
    if (experience) updateData.experience = experience;
    if (dob) updateData.dob = dob;

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    })}
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update Doctor Controller",
            error:error.message
        })
    }
 }

//Delete Doctor Controller
const deleteDoctor = async(req,res)=>{
    try {
        const doctorId = req.params.id
        if(!doctorId){
            return res.status(404).send({
                success:false,
                message:"Doctor id is required"
            })
        }

        const doctor = await doctorModel.findById(doctorId);
        if(!doctor){
            return res.status(404).send({
                success:false,
                message:"Doctor not found"
            })
        }
        await doctorModel.findByIdAndDelete(doctorId);
        res.status(200).send({
            success:true,
            message:"Doctor deleted successfully"
        })
    } catch (error) {
       console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Doctor Controlller",
            error:error.message
        })
    }
}

//UPDATE AVAILABLE DOCTOR CONTROLLER
const updateDoctorAvailability = async(req,res)=>{
    try {
        const doctorId = req.params.id;
        if(!doctorId){
            return res.status(404).send({
                success:false,
                message:"Doctor id is required"
            })
        }
        const {availableStatus} = req.body
        if(availableStatus===undefined || availableStatus===null){
            return res.status(400).send({
                success:false,
                message:"Available status is required"
            })
        }
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{$set:{availability:availableStatus}},{new:true});
        if(!doctor)
        {
            return res.status(404).send({
                success:false,
                message:'Doctor Not Found'
            })
        }
        res.status(200).send({
           success:true,
           message:"Doctor availability upated successfully",
            doctor:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update Doctor Availability controller",
            error:error.message
        })
    }
}

export {addDoctor,getAllDoctors,getDoctorDetails,updateDoctor,deleteDoctor,updateDoctorAvailability};
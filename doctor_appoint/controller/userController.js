import userModel from '../models/userModel.js';
import appointmentModel from '../models/appointmentsModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';

const userRegister = async(req,res)=>{
    try {
      const {name,email,password} = req.body;

      //validation
      if(!name || !email || !password){
        return res.status(400).send({
            success:false,
            message:"Please fill all required fields"  
        })
      }

      const existingUser = await userModel.findOne({email});
             
        //existing user
        if(existingUser){
            return res.status(409).send({
                success:false,
                message:"User already exists please login"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user data
      const userData = {name,email,password:hashedPassword};

      //save user
      const newUser = new userModel(userData);
      const user = await newUser.save();

      res.status(201).send({
        success:true,
        message:"User registered successfully",
        user
      })
    } catch (error) {
       console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in user registration",
            error:error.message
        })
    }
}  

//USER LOGIN CONTROLLER
const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(400).send({   
                success:false,
                message:"Please provide email and password"
            })
        }

        //find user
        const user = await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"User not found please register"
                })
            }
          
            //check password
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(401).send({
                    success:false,
                    message:"Invalid password"
                })
            }

            //token
            const token = jwt.sign({id:user?._id},process.env.JWT_SECRET,{expiresIn:'7d'})
            
            user.password = undefined;
            res.status(200).send({
                success:true,
                message:"User logged in successfully",
                token,
                user
            })
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success:false,
        message:"Error in user login",
        error:error.message
       }) 
    }
}

//Update user details controller
const updateUser = async(req,res)=>{
    try {
        const userId = req.user.id || req.params.id;
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"User id is required"
            })
        }

        const {name,phone,dob,address,image,gender} = req.body
       
         const updateData = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = dob;
    if (address) updateData.address = address;
    if (gender) updateData.gender = gender;

    // handle image upload safely
    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    if(Object.keys(updateData).length ===0){
        return res.status(400).send({
            success:false,
            message:"No fields provided for update"
        })    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User details updated successfully",
      user,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update user Cotroller",
            error:error.message
        })
    }
}

//UPDATE PASSWORD CONTROLLER
const updatePassword = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(404).send({
                success:false,
                message:"User id is required"
            })
        }

        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old and new password"
            })
        }
       
        //Find user
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        //Check old password
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Old Password is incorrect"
            })
        }

        //Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        //UPdate password
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success:true,
            message:"Password updated successfully"
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update password Cotroller",
            error:error.message
        })
    }
}

//get all users
export const getAllUsers = async (req,res)=>{
    try {
       const users = await userModel.find({});
       res.status(200).send({
        success:true,
        message:"All users fetched successfully",
        totalCount:users.length,
        users
       })   
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all users controller",
            error:error.message
        })
    }
}

//GET USER DETAILS CONTROLLER & appointment details
export const getUserDetails = async (req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).send({
                success:false,
                message:"User id is required"
            })
        }

        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        //Find user appointments
        const appointments = await appointmentModel.find({userId:user._id}) 
        res.status(200).send({
            success:true,
            message:"User details fetched successfully",
            user,
            appointments
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get user details controller",
            error:error.message
        })
    }
}


// GET STATS
const getStats = async (req,res)=>{
    try {
       const users = await userModel.find({});
       const doctors = await doctorModel.find({})
       const appointments = await appointmentModel.aggregate([
          {$group:{_id:null,totalEarning:{$sum:'$amount'}}}
       ])
       const total = appointments.length >0 ?appointments[0].totalEarning:0;
    
       res.status(200).send({
        success:true,
        message:"All Stats",
        stats:{
        totalUsers:users.length,
        totalDoctors : doctors.length,
        totalEarning:total,
        }
       })   
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Stats API",
            error:error.message
        })
    }
}

//Get Login User
export const getLoginUser = async (req,res)=>{
    try {
        const {id} = req.params
        if(!id)
        {
            return res.status(404).send({
                success:false,
                message:"Please provide the id"
            })
        }
       const user = await userModel.findById(id);
       
       if(!user)
       {
        return res.status(404).send({
            success:false,
            message:'No user found with this id'
        })
       }

       res.status(200).send({
        success:true,
        message:"Login User Details",
        user
       })   
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get login user details controller",
            error:error.message
        })
    }
}

export {userRegister,userLogin,updateUser,updatePassword,getStats};
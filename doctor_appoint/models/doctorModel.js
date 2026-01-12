import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
   name:{
      type:String,
      required:[true,"Name is required"]
   },
   about:{
      type:String,
      required:[true,"About is required"]
   },
   degree:{
      type:String,
      required:[true,"Degree is required"]
   },
    specialization:{
        type:String
    },
    experience:{
        type:Number
    },
    fees:{
      type:Number,
      required:[true,"Fees is required"]
    },
   email:{
        type:String,    
        required:[true,"Email is required"],
         unique:true
   },
   image:{
      type:String
   },
   phone:{
      type:String
   },
   address:{
      type:String
   },
   dob:{
      type:Date
   },
   gender:{
      type:String
   },
   availability:{
      type:Boolean,
      default:true
   }
},{timestamps:true})

const doctorModel = mongoose.model("doctor",doctorSchema);

export default doctorModel;
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"doctor"
    },
    slotDate:{
        type:String,
        required:true,
    },
    slotTime:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    payment:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const appointmentModel = mongoose.model("appointment",appointmentSchema);

export default appointmentModel;
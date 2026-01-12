import mongoose from "mongoose";
import 'colors'

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log(`Mongodb connected successfully`.bgGreen.white);
    })

    await mongoose.connect(`${process.env.MONGO_URI}/Doctor_appointment_booking`)
}

export default connectDB;
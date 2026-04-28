import mongoose from "mongoose";
import 'colors'

const connectDB = async()=>{
    const mongoUri = process.env.MONGO_URI?.trim();

    if (!mongoUri) {
        throw new Error("MONGO_URI is not set");
    }

    mongoose.connection.on('connected',()=>{
        console.log(`Mongodb connected successfully`.bgGreen.white);
    })

    await mongoose.connect(`${mongoUri}/Doctor_appointment_booking`)
}

export default connectDB;

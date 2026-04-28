import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import testRoutes from './routes/testRoutes.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import webMessageRoutes from './routes/webMessageRoute.js'
import doctorRoutes from './routes/doctorRoute.js'
import appointmentRoutes from './routes/appointmentRoute.js'


//config dotenv
dotenv.config()

const normalizeOrigin = (origin = "") => origin.trim().replace(/\/+$/, "");
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

//DATABASE CONFIGURATION
connectDB();

//REST object
const app = express()

//middlewares
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/test',testRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/webMessage',webMessageRoutes)
app.use('/api/v1/doctor',doctorRoutes)
app.use('/api/v1/appointment',appointmentRoutes)
app.get('/api/v1/health',(req,res)=>{
  res.status(200).send({
    success:true,
    message:'Backend is running'
  })
})

app.get('/',(req,res)=>{
  res.send("<h1>Doctor Appointment Booking Backend</h1>")
})
//Port
const PORT = process.env.PORT || 8080

//Run Server
app.listen(PORT,()=>{
  console.log(`Allowed frontend origins: ${allowedOrigins.join(", ")}`.bgYellow.black);
  console.log(`Node server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan.white);
})

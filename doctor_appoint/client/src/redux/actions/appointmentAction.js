import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

//get all Appointments
export const getAllAppointments = createAsyncThunk(
    "appointment/getAllAppointments",
    async(_,thunkAPI)=>{
        try {
           const res  = await API.get('/appointment/getAllAppointments');
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Get All Appointments Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//get Doctor details by id
export const getAppointmentDetails = createAsyncThunk(
    "appointment/getAppointmentDetails",
    async(_id,thunkAPI)=>{
        try {
           const res  = await API.get(`/appointment/getAppointmentDetails/${_id}`);
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Appointment Details Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//Update Appointment Status
export const updateAppointmentStatus = createAsyncThunk(
    "appointment/updateAppointmentStatus",
    async ({id,status},thunkAPI)=>{
        try {
           const res = await API.patch(`/appointment/updateAppointmentStatus/${id}`,{status})
           return res.data
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update Appointment status Error"
            return thunkAPI.rejectWithValue(message);
        }
    }
)
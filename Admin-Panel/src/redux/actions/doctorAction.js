import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/API.js"

//get all Doctors
export const getAllDoctors = createAsyncThunk(
    "doctor/getAllDoctors",
    async(_,thunkAPI)=>{
        try {
           const res  = await API.get('/doctor/getAllDoctors');
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Get All Doctors Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//get Doctor details by id
export const getDoctorDetails = createAsyncThunk(
    "doctor/getDoctorDetails",
    async(_id,thunkAPI)=>{
        try {
           const res  = await API.get(`/doctor/getDoctorDetails/${_id}`);
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Doctor Details Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//ADD DOCTOR
export const addDoctor = createAsyncThunk(
    "doctor/addDoctor",
    async(formData,thunkAPI)=>{
        try {
           const res  = await API.post('/doctor/addDoctor',formData,{
              headers:{
                 'Content-Type':'multipart/form-data'
              }
        });
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Add New Doctors Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//Update Doctor Action
export const updateDoctor = createAsyncThunk(
    "doctor/updateDoctor",
    async ({id,formData},thunkAPI)=>{
        try {
            const res = await API.patch(`/doctor/updateDoctor/${id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            });
            return res.data
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update Doctor Error"
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Delete Doctor Action
export const deleteDoctor = createAsyncThunk(
    "doctor/deleteDoctor",
    async (id,thunkAPI)=>{
        try {
           const res = await API.delete(`/doctor/deleteDoctor/${id}`)
           return res.data
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Delete Doctor Error"
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Update Status
export const updateStatus = createAsyncThunk(
    "doctor/updateStatus",
    async ({id,availableStatus},thunkAPI)=>{
        try {
           const res = await API.patch(`/doctor/updateDoctorAvailability/${id}`,{availableStatus})
           return res.data
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update Doctor status Error"
            return thunkAPI.rejectWithValue(message);
        }
    }
)

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

//LOGIN
export const login = createAsyncThunk(
    'auth/login',
    async ({email,password},thunkAPI)=>{
        try {
            const res = await API.post('/user/login',{email,password})
            localStorage.setItem("appData",JSON.stringify(res.data));
            return res.data;
        } catch (error) {
           const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString(); 
           return thunkAPI.rejectWithValue(message);
        }
    }
)

//Register
export const register = createAsyncThunk(
    'auth/register',
    async ({name,email,password},thunkAPI)=>{
        try {
            const res = await API.post('/user/register',{name,email,password})
            return res.data;
        } catch (error) {
           const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString(); 
           return thunkAPI.rejectWithValue(message);
        }
    }
)

//get user data
export const getUserData = createAsyncThunk(
    'auth/getUserData',
    ()=>{
        const localData = localStorage.getItem("appData");
        const appData = JSON.parse(localData);
        return appData?.user;
    }
)

//Get token
export const loadToken = createAsyncThunk(
    'auth/loadToken',
    ()=>{
        const localData = localStorage.getItem("appData");
        const appData = JSON.parse(localData);
        return appData?.token;
    }
)

//get Login User Details
export const getLoginUserDetails = createAsyncThunk(
    "auth/getLoginUserDetails", 
    async (id, thunkAPI) => {
        try {
            const res = await API.get(`/user/get-login-user/${id}`);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Fetching Details Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);


//Update User data
export const updateUserData = createAsyncThunk(
    "auth/updateUserData", 
    async ({id,formData}, thunkAPI) => {
        try {
            const res = await API.patch(`/user/update/${id}`,formData,{
                headers:{
                    "Content-Type":'multipart/form-data'
                }
            });
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update User Details Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get All Appointments
export const getAllAppointments = createAsyncThunk(
    "auth/getAllAppointments", 
    async (id, thunkAPI) => {
        try {
            const res = await API.get(`/appointment/getUserAppointments/${id}`);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Fetching User Appointments Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Cancel Status
export const cancelStatus = createAsyncThunk(
    "auth/cancelStatus", 
    async (id, thunkAPI) => {
        try {
            const res = await API.patch(`/appointment/cancelAppointment/${id}`);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "User Appointment Cancel Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword", 
    async ({oldPassword,newPassword}, thunkAPI) => {
        try {
            const res = await API.patch(`/user/updatePassword`,{oldPassword,newPassword});
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Update user Password Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Send Web Message
export const sendWebMessage = createAsyncThunk(
    "auth/sendWebMessage", 
    async (msgData, thunkAPI) => {
        try {
            const res = await API.post(`/webMessage/createMessage`,msgData);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Send Web Message Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Book Appointment
export const bookAppointment = createAsyncThunk(
    "auth/bookAppointment", 
    async (bookingData, thunkAPI) => {
        try {
            const res = await API.post(`/appointment/createAppointment`,bookingData);
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Book Appointment Error";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get Specific Appointment Details
export const getAppointmentDetails = createAsyncThunk(
    "auth/getAppointmentDetails",
    async (id, thunkAPI) => {
        try {
            // This hits your backend controller: getUserAppointmentDetails
            const res = await API.get(`/appointment/getAppointmentDetails/${id}`);
            return res.data; 
        } catch (error) {
            const message = error?.response?.data?.message || "Error fetching details";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

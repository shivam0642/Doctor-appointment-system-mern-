import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/API.js"

//get all users
export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(_,thunkAPI)=>{
        try {
           const res  = await API.get('/user/all-users');
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Get All User Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//get user details by id
export const getUserDetails = createAsyncThunk(
    "user/getUserDetails",
    async(_id,thunkAPI)=>{
        try {
           const res  = await API.get(`/user/get-user-details/${_id}`);
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "User Details Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);

//get Stats
export const getStats = createAsyncThunk(
    "user/getStats",
    async(_,thunkAPI)=>{
        try {
           const res  = await API.get('/user/get-stats');
            return res.data;
        } catch (error) {
           const message = 
           error?.response?.data?.message || error.message || "Get Stats Error"  
           return thunkAPI.rejectWithValue(message);
        }
    }
);
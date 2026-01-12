import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/API";

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

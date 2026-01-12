import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice.js';
import userReducer from './slice/userSlice.js';
import doctorReducer from './slice/doctorSlice.js';
import AppointmentsReducer from './slice/appointmentSlice.js'

const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        doctor:doctorReducer,
        appointments : AppointmentsReducer,
    },
});

export default store;
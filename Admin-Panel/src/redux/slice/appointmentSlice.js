import { createSlice } from "@reduxjs/toolkit";
import { getAllAppointments, getAppointmentDetails, updateAppointmentStatus } from "../actions/appointmentAction"; 

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    success: false,  
    appointments: [], 
    appointment: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // Get All Appointments
    .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null; 
    })
    .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments || action.payload;
    })
    .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.success = false; 
        state.error = action.payload;
    })
    // Get Appointment Details
    .addCase(getAppointmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null; 
    })
    .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload.appointmentDetails || action.payload;
    })
    .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false; 
        state.error = action.payload;
    })

    //Change Appointment Status
     .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
    })
    .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload.appointmentDetails || action.payload;
    })
    .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false; 
        state.error = action.payload;
    });

  },
});

export default appointmentSlice.reducer; 
export const { reset } = appointmentSlice.actions;
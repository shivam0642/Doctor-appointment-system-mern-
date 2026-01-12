import { createSlice } from "@reduxjs/toolkit";
import { addDoctor,deleteDoctor,getAllDoctors,getDoctorDetails, updateDoctor, updateStatus } from "../actions/doctorAction.js";

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    loading: false,
    success: false,   // ONLY for addDoctor
    doctors: null,
    doctor: null,
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
      // GET ALL DOCTORS
      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.doctors;
      })
      .addCase(getAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET DOCTOR DETAILS
      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.doctor;
      })
      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD DOCTOR ✅ ONLY HERE
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update Doctor
        .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
        
         //Delete Doctor

        .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.doctor = null;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Update Doctor Availability Status
     .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.doctor = action.payload.doctor;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

  },
});

export default doctorSlice.reducer; 
export const {reset} = doctorSlice.actions;
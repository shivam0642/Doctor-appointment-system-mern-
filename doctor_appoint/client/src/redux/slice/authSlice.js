import { createSlice } from "@reduxjs/toolkit";
import { bookAppointment, cancelStatus, getAllAppointments, getAppointmentDetails, getLoginUserDetails, getUserData, loadToken, login, register, resetPassword, sendWebMessage, updateUserData } from "../actions/authActions"; // adjust path if needed

const getLocalData = () => {
  const data = localStorage.getItem("appData")
  return data ? JSON.parse(data) : null
}

const localData = getLocalData();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    user: localData?.user || null,
    appointments: [],
    appointmentDetails: null,
    token: localData?.token || null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Get Login User Details
      .addCase(getLoginUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getLoginUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user
      })
      .addCase(getLoginUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Update User Details
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Update Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //User Appointments
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Book Appointment
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.appointments && action.payload.appointment) {
          state.appointments.push(action.payload.appointment)
        }
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Cancel Appointments
      .addCase(cancelStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(cancelStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Send Web Message
      .addCase(sendWebMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendWebMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendWebMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      //Get Appointment Details
      .addCase(getAppointmentDetails.pending, (state) => {
        state.loading = true;
        state.appointmentDetails = null; // Clear previous data while loading new
      })
      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Use the key returned by your backend (appointmentDetails)
        state.appointmentDetails = action.payload.appointmentDetails;
      })
      .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Load token
      .addCase(loadToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })

    //Get User Data
    .addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    })
},
})

export default authSlice.reducer;
export const { reset, logout } = authSlice.actions;

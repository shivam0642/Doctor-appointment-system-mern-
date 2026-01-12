import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getStats, getUserDetails } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    success: false,
    users: null,
    user:null,
    error: null,
    appointments:null,
    stats:null
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearUsers: (state) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      //Get User Details by ID
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.appointments = action.payload.appointments;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

       //Get all Stats
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stats = action.payload.stats;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
export const { reset, clearUsers } = userSlice.actions;

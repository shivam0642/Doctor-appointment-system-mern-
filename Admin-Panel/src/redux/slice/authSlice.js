import { createSlice } from "@reduxjs/toolkit";
import { getUserData, loadToken, login } from "../actions/authActions"; // adjust path if needed

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    reset:(state)=>{
       state.error = null;
       state.success = false;
    },
    logout:(state)=>{
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
      .addCase(loadToken.fulfilled,(state,action)=>{
          state.token = action.payload;
      }) 
      .addCase(getUserData.fulfilled,(state,action)=>{
          state.user = action.payload;
      })
  },
});

export default authSlice.reducer;
export const { reset,logout } = authSlice.actions;

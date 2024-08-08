import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./userThunk";

const initialState = {
  user: '',
  signInLoading: false,
  signInError: '',
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.user = '';
      state.signInError = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
      state.user = res?.token || '';
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.signInError = error;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { logout } = UsersSlice.actions;

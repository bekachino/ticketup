import { createSlice } from '@reduxjs/toolkit';
import { getSupervisors, signIn } from './userThunk';

const initialState = {
  user: '',
  supervisors: [],
  signInLoading: false,
  supervisorsLoading: false,
  signInError: '',
  supervisorsError: '',
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

    builder.addCase(getSupervisors.pending, (state) => {
      state.supervisorsError = '';
      state.supervisorsLoading = true;
    });
    builder.addCase(getSupervisors.fulfilled, (state, { payload: res }) => {
      state.supervisorsLoading = false;
      state.supervisors = res || '';
    });
    builder.addCase(getSupervisors.rejected, (state, { payload: error }) => {
      state.supervisorsLoading = false;
      state.supervisorsError = error;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { logout } = UsersSlice.actions;

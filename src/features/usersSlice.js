import { createSlice } from '@reduxjs/toolkit';
import { getSupervisors, signIn, signUp } from './userThunk';

const initialState = {
  user: null,
  supervisors: [],
  signInLoading: false,
  signUpLoading: false,
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
      state.user = null;
      state.signInError = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
      state.user = {
        message: res?.message,
        token: res?.token,
        role: res?.role,
        username: res?.username,
        surname: res?.fullname,
        id: res?.user_id,
      };
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.signInError = error;
    });

    builder.addCase(signUp.pending, (state) => {
      state.signUpError = '';
      state.signUpLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload: res }) => {
      state.signUpLoading = false;
    });
    builder.addCase(signUp.rejected, (state, { payload: error }) => {
      state.signUpLoading = false;
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

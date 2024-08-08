import { createSlice } from "@reduxjs/toolkit";
import { getApplications } from "./dataThunk";

const initialState = {
  applications: [],
  applicationsLoading: false,
  applicationsError: '',
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplications.pending, (state) => {
      state.applicationsError = '';
      state.applicationsLoading = true;
    });
    builder.addCase(getApplications.fulfilled, (state, { payload: res }) => {
      state.applicationsLoading = false;
      state.applications = res;
    });
    builder.addCase(getApplications.rejected, (state, { payload: error }) => {
      state.applicationsLoading = false;
      state.applicationsError = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {} = DataSlice.actions;

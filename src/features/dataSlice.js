import { createSlice } from "@reduxjs/toolkit";
import { getApplications, getLocationsList, getRegions } from "./dataThunk";

const initialState = {
  applications: [],
  regions: [],
  cities: [],
  districts: [],
  streets: [],
  houses: [],
  applicationsLoading: false,
  regionsLoading: false,
  citiesLoading: false,
  districtsLoading: false,
  streetsLoading: false,
  housesLoading: false,
  applicationsError: '',
  locationsFetchErrorMessage: '',
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
    
    builder.addCase(getRegions.pending, (state) => {
      state.regionsLoading = true;
      state.locationsFetchErrorMessage = '';
    });
    builder.addCase(getRegions.fulfilled, (state, { payload: res }) => {
      state.regionsLoading = false;
      state.regions = res;
    });
    builder.addCase(getRegions.rejected, (state, { payload: error }) => {
      state.regionsLoading = false;
      state.locationsFetchErrorMessage = error;
    });
    
    builder.addCase(getLocationsList.pending, (state) => {
      state.citiesLoading = true;
      state.locationsFetchErrorMessage = '';
    });
    builder.addCase(getLocationsList.fulfilled, (state, { payload: res }) => {
      state.citiesLoading = false;
      state[res.addressType] = res.data;
    });
    builder.addCase(getLocationsList.rejected, (state, { payload: error }) => {
      state.citiesLoading = false;
      state.locationsFetchErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
//export const {} = DataSlice.actions;

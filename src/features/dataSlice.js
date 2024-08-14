import { createSlice } from "@reduxjs/toolkit";
import {
  getApplications, getLocationsList, getBxSquares, getRegions, getBxRegions
} from "./dataThunk";
import { availableTariffs } from "../constants";

const initialState = {
  applications: [],
  regions: [],
  cities: [],
  districts: [],
  streets: [],
  houses: [],
  bxRegions: [],
  bxSquares: [],
  orderStatuses: [],
  tariffs: [],
  superTvChoices: [],
  routerInstallationTypes: [],
  applicationsLoading: false,
  regionsLoading: false,
  citiesLoading: false,
  districtsLoading: false,
  streetsLoading: false,
  housesLoading: false,
  bxRegionsLoading: false,
  bxSquaresLoading: false,
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
    
    builder.addCase(getBxRegions.pending, (state) => {
      state.bxRegionsLoading = true;
      state.locationsFetchErrorMessage = '';
    });
    builder.addCase(getBxRegions.fulfilled, (state, { payload: res }) => {
      state.bxRegionsLoading = false;
      state.bxRegions = res[0];
      state.orderStatuses = res[3]?.slice(0, 2);
      state.routerInstallationTypes = res[2];
      state.tariffs = res[1]?.filter(tariff => availableTariffs.includes(tariff?.VALUE));
      state.superTvChoices = res[5];
    });
    builder.addCase(getBxRegions.rejected, (state, { payload: error }) => {
      state.bxRegionsLoading = false;
      state.locationsFetchErrorMessage = error;
    });
    
    builder.addCase(getBxSquares.pending, (state) => {
      state.bxSquaresLoading = true;
      state.locationsFetchErrorMessage = '';
    });
    builder.addCase(getBxSquares.fulfilled, (state, { payload: res }) => {
      state.bxSquaresLoading = false;
      state.bxSquares = res;
    });
    builder.addCase(getBxSquares.rejected, (state, { payload: error }) => {
      state.bxSquaresLoading = false;
      state.locationsFetchErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
//export const {} = DataSlice.actions;

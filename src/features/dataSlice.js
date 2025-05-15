import { createSlice } from '@reduxjs/toolkit';
import {
  getApplications,
  getLocationsList,
  getBxSquares,
  getRegions,
  getBxRegions,
  createApplication,
  getNeactivka,
  getZhaloba,
  getDataForNewNeactivkaForm,
  createNeactivka,
  getDataForNewZhalobaForm,
  createZhaloba, createSupervizer, getRegionsList,
} from './dataThunk';
import { availableTariffs } from '../constants';

const initialState = {
  applications: [],
  regions: [],
  regionsList: [],
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
  providers: [],
  discounts: [],
  neactivka: [],
  zhaloba: [],
  neactivkaRegions: [],
  neactivkaDistricts: [],
  neactivkaStatuses: [],
  neactivkaPaymentStatuses: [],
  neactivkaTariffs: [],
  neactivkaReasons: [],
  neactivkaDiscounts: [],
  neactivkaEquipmentsForFix: [],
  zhalobaRegions: [],
  zhalobaDistricts: [],
  zhalobaReasons: [],
  applicationRes: null,
  applicationsLoading: false,
  createSupervizerLoading: false,
  regionsListLoading: false,
  regionsLoading: false,
  citiesLoading: false,
  districtsLoading: false,
  streetsLoading: false,
  housesLoading: false,
  bxRegionsLoading: false,
  bxSquaresLoading: false,
  createApplicationLoading: false,
  neactivkaLoading: false,
  zhalobaLoading: false,
  neactivkaFormDataLoading: false,
  createNeactivkaLoading: false,
  zhalobaFormDataLoading: false,
  createZhalobaLoading: false,
  applicationsError: '',
  formSuccess: false,
  neactivkaError: '',
  zhalobaError: '',
  createApplicationErrorMessage: '',
  createNeactivkaErrorMessage: '',
  createZhalobaErrorMessage: '',
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetCreateApplicationErrorMessage: (state) => {
      state.createApplicationErrorMessage = '';
    },
    resetCreateNeactivkaErrorMessage: (state) => {
      state.createNeactivkaErrorMessage = '';
    },
    resetCreateZhalobaErrorMessage: (state) => {
      state.createZhalobaErrorMessage = '';
    },
    resetApplicationRes: (state) => {
      state.applicationRes = null;
    },
    resetFormSuccess: (state) => {
      state.formSuccess = false;
    },
  },
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

    builder.addCase(getRegionsList.pending, (state) => {
      state.regionsListLoading = true;
    });
    builder.addCase(getRegionsList.fulfilled, (state, { payload: res }) => {
      state.regionsListLoading = false;
      state.regionsList = res;
    });
    builder.addCase(getRegionsList.rejected, (state) => {
      state.regionsListLoading = false;
    });

    builder.addCase(getRegions.pending, (state) => {
      state.regionsLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getRegions.fulfilled, (state, { payload: res }) => {
      state.regionsLoading = false;
      state.regions = res;
    });
    builder.addCase(getRegions.rejected, (state, { payload: error }) => {
      state.regionsLoading = false;
      state.createApplicationErrorMessage = error;
    });

    builder.addCase(getLocationsList.pending, (state) => {
      state.citiesLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getLocationsList.fulfilled, (state, { payload: res }) => {
      state.citiesLoading = false;
      state[res?.addressType] = res?.data;
    });
    builder.addCase(getLocationsList.rejected, (state, { payload: error }) => {
      state.citiesLoading = false;
      state.createApplicationErrorMessage = error;
    });

    builder.addCase(getBxRegions.pending, (state) => {
      state.bxRegionsLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getBxRegions.fulfilled, (state, { payload: res }) => {
      state.bxRegionsLoading = false;
      state.bxRegions = res[0];
      state.tariffs = res[1]?.filter((tariff) =>
        availableTariffs.includes(tariff?.VALUE)
      );
      state.routerInstallationTypes = res[2];
      state.orderStatuses = res[3]?.slice(0, 2);
      state.providers = res[4];
      state.superTvChoices = res[5];
      state.discounts = res[6];
    });
    builder.addCase(getBxRegions.rejected, (state, { payload: error }) => {
      state.bxRegionsLoading = false;
      state.createApplicationErrorMessage = error;
    });

    builder.addCase(getBxSquares.pending, (state) => {
      state.bxSquaresLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(getBxSquares.fulfilled, (state, { payload: res }) => {
      state.bxSquaresLoading = false;
      state.bxSquares = res;
    });
    builder.addCase(getBxSquares.rejected, (state, { payload: error }) => {
      state.bxSquaresLoading = false;
      state.createApplicationErrorMessage = error;
    });

    builder.addCase(createApplication.pending, (state) => {
      state.createApplicationLoading = true;
      state.createApplicationErrorMessage = '';
    });
    builder.addCase(createApplication.fulfilled, (state, { payload: res }) => {
      state.createApplicationLoading = false;
      state.applicationRes = res;
      state.formSuccess = true;
    });
    builder.addCase(createApplication.rejected, (state, { payload: error }) => {
      state.createApplicationLoading = false;
      state.createApplicationErrorMessage = error;
    });

    builder.addCase(getNeactivka.pending, (state) => {
      state.neactivkaLoading = true;
      state.neactivkaError = '';
    });
    builder.addCase(getNeactivka.fulfilled, (state, { payload: res }) => {
      state.neactivkaLoading = false;
      state.neactivka = res;
    });
    builder.addCase(getNeactivka.rejected, (state, { payload: error }) => {
      state.neactivkaLoading = false;
      state.neactivkaError = error;
    });

    builder.addCase(getZhaloba.pending, (state) => {
      state.zhalobaLoading = true;
      state.zhalobaError = '';
    });
    builder.addCase(getZhaloba.fulfilled, (state, { payload: res }) => {
      state.zhalobaLoading = false;
      state.zhaloba = res;
    });
    builder.addCase(getZhaloba.rejected, (state, { payload: error }) => {
      state.zhalobaLoading = false;
      state.zhalobaError = error;
    });

    builder.addCase(getDataForNewNeactivkaForm.pending, (state) => {
      state.neactivkaFormDataLoading = true;
      state.createNeactivkaErrorMessage = '';
    });
    builder.addCase(
      getDataForNewNeactivkaForm.fulfilled,
      (state, { payload: res }) => {
        state.neactivkaFormDataLoading = false;
        state.neactivkaDistricts = res[0];
        state.neactivkaRegions = res[1];
        state.neactivkaStatuses = res[2];
        state.neactivkaPaymentStatuses = res[3];
        state.neactivkaTariffs = res[4];
        state.neactivkaReasons = res[5];
        state.neactivkaDiscounts = res[6];
        state.neactivkaEquipmentsForFix = res[7];
      }
    );
    builder.addCase(
      getDataForNewNeactivkaForm.rejected,
      (state, { payload: error }) => {
        state.neactivkaFormDataLoading = false;
        state.createNeactivkaErrorMessage = error;
      }
    );

    builder.addCase(createNeactivka.pending, (state) => {
      state.createNeactivkaLoading = true;
      state.createNeactivkaErrorMessage = '';
    });
    builder.addCase(createNeactivka.fulfilled, (state) => {
      state.createNeactivkaLoading = false;
      state.formSuccess = true;
    });
    builder.addCase(createNeactivka.rejected, (state, { payload: error }) => {
      state.createNeactivkaLoading = false;
      state.createNeactivkaErrorMessage = error;
    });

    builder.addCase(getDataForNewZhalobaForm.pending, (state) => {
      state.zhalobaFormDataLoading = true;
      state.createZhalobaErrorMessage = '';
    });
    builder.addCase(
      getDataForNewZhalobaForm.fulfilled,
      (state, { payload: res }) => {
        state.zhalobaFormDataLoading = false;
        state.zhalobaDistricts = res[0];
        state.zhalobaRegions = res[1];
        state.zhalobaReasons = res[2];
      }
    );
    builder.addCase(
      getDataForNewZhalobaForm.rejected,
      (state, { payload: error }) => {
        state.zhalobaFormDataLoading = false;
        state.createZhalobaErrorMessage = error;
      }
    );

    builder.addCase(createZhaloba.pending, (state) => {
      state.createZhalobaLoading = true;
      state.createZhalobaErrorMessage = '';
    });
    builder.addCase(createZhaloba.fulfilled, (state) => {
      state.createZhalobaLoading = false;
      state.formSuccess = true;
    });
    builder.addCase(createZhaloba.rejected, (state, { payload: error }) => {
      state.createZhalobaLoading = false;
      state.createZhalobaErrorMessage = error;
    });
    builder.addCase(createSupervizer.pending, (state) => {
      state.createSupervizerLoading = true;
    });
    builder.addCase(createSupervizer.fulfilled, (state) => {
      state.createSupervizerLoading = false;
    });
    builder.addCase(createSupervizer.rejected, (state) => {
      state.createSupervizerLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  resetApplicationRes,
  resetCreateApplicationErrorMessage,
  resetCreateNeactivkaErrorMessage,
  resetCreateZhalobaErrorMessage,
  resetFormSuccess,
} = DataSlice.actions;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { SMTH_WENT_WRONG } from '../constants';

export const getApplications = createAsyncThunk(
  'data/getApplications',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('mazay/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getRegionsList = createAsyncThunk(
  'data/getRegionsList',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('super_register/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getRegions = createAsyncThunk(
  'data/getRegions',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('region_list/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getLocationsList = createAsyncThunk(
  'data/getLocationsList',
  async (data, { rejectWithValue }) => {
    try {
      if (!data?.parentId) return;
      const req = await axiosApi(
        `get_child_${data?.locationType}?parent_id=${data?.parentId}`
      );
      const res = await req.data;
      return {
        data: res || [],
        addressType: data.addressType,
      };
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getBxRegions = createAsyncThunk(
  'data/getBxRegions',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('send-data-router/');
      return (await req.data) || {};
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getBxSquares = createAsyncThunk(
  'data/getBxSquares',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('bx/');
      return (await req.data) || {};
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const createApplication = createAsyncThunk(
  'data/createApplication',
  async (data, { rejectWithValue }) => {
    try {
      const assetsFormData = new FormData();
      assetsFormData.append('file1', data?.passport1);
      assetsFormData.append('file2', data?.passport2);
      assetsFormData.append('file3', data?.locationScreenShot);
      const resFromTelegraph = await axiosApi.post(
        '/upload-passport/',
        assetsFormData
      );
      const telegraphAssetLinks = {
        passport1: resFromTelegraph.data?.data[0]?.image_path,
        passport2: resFromTelegraph.data?.data[1]?.image_path,
        locationScreenShot: resFromTelegraph.data?.data[2]?.image_path,
      };
      const createApplicationData = {
        ...data,
        address: {
          region: data?.region,
          city: data?.city,
          district: data?.district,
          street: data?.street,
        },
        exactAddress: {
          address: data?.exactAddress,
        },
        userPhoneNumber: `996${data?.userPhoneNumber}`,
        userAdditionalPhoneNumber: data?.userAdditionalPhoneNumber
          ? `996${data?.userAdditionalPhoneNumber}`
          : null,
        assets: telegraphAssetLinks,
      };
      const createApplication = await axiosApi.post(
        '/z/',
        createApplicationData
      );
      return createApplication.data;
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getNeactivka = createAsyncThunk(
  'data/getNeactivka',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('zayavkaneaktivka/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getZhaloba = createAsyncThunk(
  'data/getZhaloba',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('zhalobalist/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getDataForNewNeactivkaForm = createAsyncThunk(
  'data/getDataForNewNeactivkaForm',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('neactivka/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const createNeactivka = createAsyncThunk(
  'data/createNeactivka',
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post('create-neactivka/', data);
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getDataForNewZhalobaForm = createAsyncThunk(
  'data/getDataForNewZhalobaForm',
  async (_, { rejectWithValue }) => {
    try {
      const req = await axiosApi('zhaloba/');
      return (await req.data) || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const createZhaloba = createAsyncThunk(
  'data/createZhaloba',
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post('create-zhaloba/', data);
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const createSupervizer = createAsyncThunk(
  'data/createSupervizer',
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post('super_register/', data);
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const postAddresses = createAsyncThunk(
  'data/postAddresses',
  async () => {
    try {
      await axiosApi.post('addresses/');
    } catch (e) {
      console.log(e);
    }
  }
);

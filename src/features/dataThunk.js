import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { SMTH_WENT_WRONG } from "../constants";

export const getApplications = createAsyncThunk("data/getApplications", async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi('mazay/');
    return await req.data || [];
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

export const getRegions = createAsyncThunk("data/getRegions", async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi('region_list/');
    return await req.data || [];
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

export const getLocationsList = createAsyncThunk("data/getLocationsList", async (data, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`get_child_${data?.locationType}?parent_id=${data?.parentId}`);
    const res = await req.data;
    return {
      data: res || [],
      addressType: data.addressType,
    };
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

export const getBxRegions = createAsyncThunk("data/getBxRegions", async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi('send-data-router/');
    return await req.data || {};
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

export const getBxSquares = createAsyncThunk("data/getBxSquares", async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi('bx/');
    return await req.data || {};
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

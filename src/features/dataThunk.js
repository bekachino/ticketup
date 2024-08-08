import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { SMTH_WENT_WRONG } from "../constants";

export const getApplications = createAsyncThunk("data/getApplications", async (userData, { rejectWithValue }) => {
  try {
    const req = await axiosApi('mazay/');
    return await req.data || [];
  } catch (e) {
    return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
  }
});

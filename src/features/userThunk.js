import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { SMTH_WENT_WRONG } from '../constants';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/login/', userData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('register/', userData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

export const getSupervisors = createAsyncThunk(
  'user/getSupervisors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi('agent_register/');
      return response.data || [];
    } catch (e) {
      return rejectWithValue(e.response.data?.error || SMTH_WENT_WRONG);
    }
  }
);

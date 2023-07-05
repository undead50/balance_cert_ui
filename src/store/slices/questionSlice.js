import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchQuestions = createAsyncThunk(
  '/questionData/list',
  async (payload) => {
    try {
      const url = BACKEND_URL + '/questions';
      const { data } = await axios.get(url, payload);
      return data;
    } catch (err) {
      return err;
    }
  }
);

export const addQuestion = createAsyncThunk(
  'questionData/add',
  async (payload) => {
    try {
      const url = BACKEND_URL + '/questions/create';
      const { data } = await axios.post(url, payload);
      return data;
    } catch (err) {
      return err;
    }
  }
);

const qusetionSlice = createSlice({
  name: 'question',
  initialState: {
    data: null,
    loading: false,
    error: false,
  },
  reducers: {
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [addQuestion.pending]: (state) => {
      state.loading = true;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [addQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const questionReducer = qusetionSlice.reducer;

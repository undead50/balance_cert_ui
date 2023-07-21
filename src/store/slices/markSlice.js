import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';

const initialState = {
  marks: [],
  mark_loading: false,
  mark_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchMarksAsync = createAsyncThunk('mark/fetchMarks', async () => {
  try {
    const url = BACKEND_URL + '/mark/fetchMarks';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createMarkAsync = createAsyncThunk(
  'mark/createMark',
  async (markData) => {
    try {
      const url = BACKEND_URL + '/mark/createMark';
      const response = await axiosInstance.post(url, markData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateMarkAsync = createAsyncThunk(
  'mark/updateMark',
  async (markData) => {
    try {
      const url = BACKEND_URL + `/mark/updateMark/${markData.id}`;
      const response = await axiosInstance.put(url, markData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteMarkAsync = createAsyncThunk(
  'mark/deleteMark',
  async (markId) => {
    try {
      const url = BACKEND_URL + `/mark/deleteMark/${markId}`;
      await axiosInstance.delete(url);
      return markId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const markSlice = createSlice({
  name: 'mark',
  initialState,
  reducers: {
    resetStateMark: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.marks = action.payload;
      })
      .addCase(fetchMarksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMarkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMarkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.marks.push(action.payload);
      })
      .addCase(createMarkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMarkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMarkAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedMark = action.payload;
        const index = state.marks.findIndex(
          (mark) => mark.id === updatedMark.id
        );
        if (index !== -1) {
          state.marks[index] = updatedMark;
        }
      })
      .addCase(updateMarkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMarkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMarkAsync.fulfilled, (state, action) => {
        state.loading = false;
        const markId = action.payload;
        state.marks = state.marks.filter((mark) => mark.id !== markId);
      })
      .addCase(deleteMarkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetStateMark } = markSlice.actions;
export const markReducer = markSlice.reducer;
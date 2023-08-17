import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';
import { notification } from 'antd';

const callNotification = ((description, type) => {
  notification.open({
    message: 'info',
    description: description,
    duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
    type: type,
  });
})

const initialState = {
  mydashboards: [],
  mydashboard_loading: false,
  mydashboard_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchMydashboardsAsync = createAsyncThunk('mydashboard/fetchMydashboards', async () => {
  try {
    const url = BACKEND_URL + '/mydashboard/fetchMydashboards';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createMydashboardAsync = createAsyncThunk(
  'mydashboard/createMydashboard',
  async (mydashboardData) => {
    try {
      const url = BACKEND_URL + '/mydashboard/createMydashboard';
      const response = await axiosInstance.post(url, mydashboardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateMydashboardAsync = createAsyncThunk(
  'mydashboard/updateMydashboard',
  async (mydashboardData) => {
    try {
      const url = BACKEND_URL + `/mydashboard/updateMydashboard/${mydashboardData.id}`;
      const response = await axiosInstance.put(url, mydashboardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteMydashboardAsync = createAsyncThunk(
  'mydashboard/deleteMydashboard',
  async (mydashboardId) => {
    try {
      const url = BACKEND_URL + `/mydashboard/deleteMydashboard/${mydashboardId}`;
      await axiosInstance.delete(url);
      return mydashboardId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const mydashboardSlice = createSlice({
  name: 'mydashboard',
  initialState,
  reducers: {
    resetStateMydashboard: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMydashboardsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMydashboardsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mydashboards = action.payload;
      })
      .addCase(fetchMydashboardsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMydashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMydashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mydashboards.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createMydashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateMydashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMydashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedMydashboard = action.payload;
        const index = state.mydashboards.findIndex(
          (mydashboard) => mydashboard.id === updatedMydashboard.id
        );
        if (index !== -1) {
          state.mydashboards[index] = updatedMydashboard;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateMydashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteMydashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMydashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        const mydashboardId = action.payload;
        state.mydashboards = state.mydashboards.filter((mydashboard) => mydashboard.id !== mydashboardId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteMydashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateMydashboard } = mydashboardSlice.actions;
export const mydashboardReducer = mydashboardSlice.reducer;
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
  dashboards: [],
  dashboard_loading: false,
  dashboard_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchDashboardsAsync = createAsyncThunk('dashboard/fetchDashboards', async (branchCode) => {
  try {
    const queryParams = {
      branchCode: branchCode,
    };
    const url = BACKEND_URL + '/dashboard/fetchDashboards';
    const response = await axiosInstance.get(url,{
      params: queryParams
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createDashboardAsync = createAsyncThunk(
  'dashboard/createDashboard',
  async (dashboardData) => {
    try {
      const url = BACKEND_URL + '/dashboard/createDashboard';
      const response = await axiosInstance.post(url, dashboardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateDashboardAsync = createAsyncThunk(
  'dashboard/updateDashboard',
  async (dashboardData) => {
    try {
      const url = BACKEND_URL + `/dashboard/updateDashboard/${dashboardData.id
    }`;
      const response = await axiosInstance.put(url, dashboardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteDashboardAsync = createAsyncThunk(
  'dashboard/deleteDashboard',
  async (dashboardId) => {
    try {
      const url = BACKEND_URL + `/ dashboard / delete Dashboard / ${ dashboardId } `;
      await axiosInstance.delete(url);
      return dashboardId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetStateDashboard: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboards = action.payload;
      })
      .addCase(fetchDashboardsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboards.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createDashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateDashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDashboard = action.payload;
        const index = state.dashboards.findIndex(
          (dashboard) => dashboard.id === updatedDashboard.id
        );
        if (index !== -1) {
          state.dashboards[index] = updatedDashboard;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateDashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteDashboardAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDashboardAsync.fulfilled, (state, action) => {
        state.loading = false;
        const dashboardId = action.payload;
        state.dashboards = state.dashboards.filter((dashboard) => dashboard.id !== dashboardId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteDashboardAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateDashboard } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
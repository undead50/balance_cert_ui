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
  reports: [],
  report_loading: false,
  report_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchReportsAsync = createAsyncThunk('report/fetchReports', async (data) => {
  try {
    const params = {
      startDate : data.startDate,
      endDate : data.endDate,
    };
    const url = BACKEND_URL + '/report/fetchReports';
    const response = await axiosInstance.get(url,{params});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createReportAsync = createAsyncThunk(
  'report/createReport',
  async (reportData) => {
    try {
      const url = BACKEND_URL + '/report/createReport';
      const response = await axiosInstance.post(url, reportData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateReportAsync = createAsyncThunk(
  'report/updateReport',
  async (reportData) => {
    try {
      const url = BACKEND_URL + `/report/updateReport/${reportData.id
    }`;
      const response = await axiosInstance.put(url, reportData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteReportAsync = createAsyncThunk(
  'report/deleteReport',
  async (reportId) => {
    try {
      const url = BACKEND_URL + `/ report / delete Report / ${ reportId } `;
      await axiosInstance.delete(url);
      return reportId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetStateReport: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReportsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReportAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createReportAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateReportAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReportAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReport = action.payload;
        const index = state.reports.findIndex(
          (report) => report.id === updatedReport.id
        );
        if (index !== -1) {
          state.reports[index] = updatedReport;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateReportAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteReportAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportAsync.fulfilled, (state, action) => {
        state.loading = false;
        const reportId = action.payload;
        state.reports = state.reports.filter((report) => report.id !== reportId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteReportAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateReport } = reportSlice.actions;
export const reportReducer = reportSlice.reducer;
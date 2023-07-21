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
  risks: [],
  loading: false,
  error: null,
  assSummary: []
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



export const fetchRisksAsync = createAsyncThunk('risk/fetchRisks', async () => {
  try {
    const url = BACKEND_URL + '/risk/fetchRisks';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createRiskAsync = createAsyncThunk(
  'risk/createRisk',
  async (riskData) => {
    try {
      const url = BACKEND_URL + '/risk/createRisk';
      const response = await axiosInstance.post(url, riskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateRiskAsync = createAsyncThunk(
  'risk/updateRisk',
  async (riskData) => {
    try {
      const url = BACKEND_URL + `/risk/updateRisk/${riskData.id}`;
      const response = await axiosInstance.put(url, riskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const calculateRiskAsync = createAsyncThunk(
  'risk/calculateRisk',
  async (riskData) => {
    try {
      const url = BACKEND_URL + `/risk/calculateScore/${riskData.id}`;
      const response = await axiosInstance.put(url, riskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteRiskAsync = createAsyncThunk(
  'risk/deleteRisk',
  async (riskId) => {
    try {
      const url = BACKEND_URL + `/risk/deleteRisk/${riskId}`;
      await axiosInstance.delete(url);
      return riskId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    resetStateRisk: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRisksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.risks = action.payload;
      })
      .addCase(fetchRisksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRiskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRiskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.risks.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateRiskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRisk = action.payload;
        const index = state.risks.findIndex(
          (risk) => risk.id === updatedRisk.id
        );
        if (index !== -1) {
          state.risks[index] = updatedRisk;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteRiskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRiskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const riskId = action.payload;
        state.risks = state.risks.filter((risk) => risk.id !== riskId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(calculateRiskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateRiskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.assSummary = action.payload;
      })
      .addCase(calculateRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
export const { resetStateRisk } = riskSlice.actions;
export const riskReducer = riskSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';

const initialState = {
  risks: [],
  loading: false,
  error: null,
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
  reducers: {},
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
      })
      .addCase(createRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      .addCase(updateRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRiskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRiskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const riskId = action.payload;
        state.risks = state.risks.filter((risk) => risk.id !== riskId);
      })
      .addCase(deleteRiskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const riskReducer = riskSlice.reducer;
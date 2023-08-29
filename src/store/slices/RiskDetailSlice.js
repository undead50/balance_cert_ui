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
  RiskDetails: [],
  RiskDetail_loading: false,
  RiskDetail_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchRiskdetailsAsync = createAsyncThunk('RiskDetail/fetchRiskdetails', async () => {
  try {
    const url = BACKEND_URL + '/RiskDetail/fetchRiskdetails';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createRiskdetailAsync = createAsyncThunk(
  'RiskDetail/createRiskdetail',
  async (RiskDetailData) => {
    try {
      const url = BACKEND_URL + '/RiskDetail/createRiskdetail';
      const response = await axiosInstance.post(url, RiskDetailData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateRiskdetailAsync = createAsyncThunk(
  'RiskDetail/updateRiskdetail',
  async (RiskDetailData) => {
    try {
      const url = BACKEND_URL + `/RiskDetail/updateRiskdetail/${RiskDetailData.id
    }`;
      const response = await axiosInstance.put(url, RiskDetailData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteRiskdetailAsync = createAsyncThunk(
  'RiskDetail/deleteRiskdetail',
  async (RiskDetailId) => {
    try {
      const url = BACKEND_URL + `/ RiskDetail / delete Riskdetail / ${ RiskDetailId } `;
      await axiosInstance.delete(url);
      return RiskDetailId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const RiskDetailSlice = createSlice({
  name: 'RiskDetail',
  initialState,
  reducers: {
    resetStateRiskdetail: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiskdetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiskdetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.RiskDetails = action.payload;
      })
      .addCase(fetchRiskdetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRiskdetailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRiskdetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.RiskDetails.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createRiskdetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateRiskdetailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRiskdetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRiskdetail = action.payload;
        const index = state.RiskDetails.findIndex(
          (RiskDetail) => RiskDetail.id === updatedRiskdetail.id
        );
        if (index !== -1) {
          state.RiskDetails[index] = updatedRiskdetail;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateRiskdetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteRiskdetailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRiskdetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        const RiskDetailId = action.payload;
        state.RiskDetails = state.RiskDetails.filter((RiskDetail) => RiskDetail.id !== RiskDetailId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteRiskdetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateRiskdetail } = RiskDetailSlice.actions;
export const RiskDetailReducer = RiskDetailSlice.reducer;
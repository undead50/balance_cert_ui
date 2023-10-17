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
  qrcertificates: [],
  qrcertificate_loading: false,
  qrcertificate_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchQrcertificatesAsync = createAsyncThunk('qrcertificate/fetchQrcertificates', async () => {
  try {
    const url = BACKEND_URL + '/qrcertificate/fetchQrcertificates';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createQrcertificateAsync = createAsyncThunk(
  'qrcertificate/createQrcertificate',
  async (qrcertificateData) => {
    try {
      const url = BACKEND_URL + '/qrcertificate/createQrcertificate';
      const response = await axiosInstance.post(url, qrcertificateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateQrcertificateAsync = createAsyncThunk(
  'qrcertificate/updateQrcertificate',
  async (qrcertificateData) => {
    try {
      const url = BACKEND_URL + `/qrcertificate/updateQrcertificate/${qrcertificateData.id
    }`;
      const response = await axiosInstance.put(url, qrcertificateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteQrcertificateAsync = createAsyncThunk(
  'qrcertificate/deleteQrcertificate',
  async (qrcertificateId) => {
    try {
      const url = BACKEND_URL + `/qrcertificate/deleteQrcertificate/${ qrcertificateId } `;
      await axiosInstance.delete(url);
      return qrcertificateId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const qrcertificateSlice = createSlice({
  name: 'qrcertificate',
  initialState,
  reducers: {
    resetStateQrcertificate: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQrcertificatesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQrcertificatesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.qrcertificates = action.payload;
      })
      .addCase(fetchQrcertificatesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createQrcertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQrcertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.qrcertificates.push(action.payload);
        callNotification('Operation Successfull', 'success');
        
      })
      .addCase(createQrcertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateQrcertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQrcertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedQrcertificate = action.payload;
        const index = state.qrcertificates.findIndex(
          (qrcertificate) => qrcertificate.id === updatedQrcertificate.id
        );
        if (index !== -1) {
          state.qrcertificates[index] = updatedQrcertificate;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateQrcertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteQrcertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQrcertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const qrcertificateId = action.payload;
        state.qrcertificates = state.qrcertificates.filter((qrcertificate) => qrcertificate.id !== qrcertificateId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteQrcertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateQrcertificate } = qrcertificateSlice.actions;
export const qrcertificateReducer = qrcertificateSlice.reducer;
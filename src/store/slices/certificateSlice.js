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
  certificates: [],
  certificate_loading: false,
  report_type: "",
  custom_description:"",
  certificate_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchCertificatesAsync = createAsyncThunk('certificate/fetchCertificates', async () => {
  try {
    const url = BACKEND_URL + '/certificate/fetchCertificates';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createCertificateAsync = createAsyncThunk(
  'certificate/createCertificate',
  async (certificateData) => {
    try {
      const url = BACKEND_URL + '/certificate/createCertificate';
      const response = await axiosInstance.post(url, certificateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateCertificateAsync = createAsyncThunk(
  'certificate/updateCertificate',
  async (certificateData) => {
    try {
      const url = BACKEND_URL + `/certificate/updateCertificate/${certificateData.id
    }`;
      const response = await axiosInstance.put(url, certificateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteCertificateAsync = createAsyncThunk(
  'certificate/deleteCertificate',
  async (certificateId) => {
    try {
      const url = BACKEND_URL + `/certificate/deleteCertificate/${ certificateId } `;
      await axiosInstance.delete(url);
      return certificateId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    setReportType: (state, action) => {
      state.report_type = action.payload
    },
    setCustomDescription: (state, action) => {
      state.custom_description = action.payload
    },
    resetStateCertificate: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificatesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificatesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificatesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createCertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateCertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCertificate = action.payload;
        const index = state.certificates.findIndex(
          (certificate) => certificate.id === updatedCertificate.id
        );
        if (index !== -1) {
          state.certificates[index] = updatedCertificate;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateCertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteCertificateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCertificateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const certificateId = action.payload;
        state.certificates = state.certificates.filter((certificate) => certificate.id !== certificateId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteCertificateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateCertificate,setCustomDescription,setReportType } = certificateSlice.actions;
export const certificateReducer = certificateSlice.reducer;
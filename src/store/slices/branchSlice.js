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
  branchs: [],
  branch_loading: false,
  branch_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchBranchsAsync = createAsyncThunk('branch/fetchBranchs', async () => {
  try {
    const url = BACKEND_URL + '/branch/fetchBranchs';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const syncBranchAsync = createAsyncThunk('branch/syncBranch', async () => {
  try {
    const url = BACKEND_URL + '/branch/syncBranch';
    const response = await axiosInstance.post(url);
    return response.data;
    
  } catch (error) {
    throw new Error(error.response.data.error);
  }
})

export const createBranchAsync = createAsyncThunk(
  'branch/createBranch',
  async (branchData) => {
    try {
      const url = BACKEND_URL + '/branch/createBranch';
      const response = await axiosInstance.post(url, branchData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateBranchAsync = createAsyncThunk(
  'branch/updateBranch',
  async (branchData) => {
    try {
      const url = BACKEND_URL + `/branch/updateBranch/${branchData.id
    }`;
      const response = await axiosInstance.put(url, branchData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteBranchAsync = createAsyncThunk(
  'branch/deleteBranch',
  async (branchId) => {
    try {
      const url = BACKEND_URL + `/ branch / delete Branch / ${ branchId } `;
      await axiosInstance.delete(url);
      return branchId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    resetStateBranch: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
        .addCase(syncBranchAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(syncBranchAsync.fulfilled, (state, action) => {
          state.loading = false;
          callNotification('Operation Successfull', 'success');
        })
        .addCase(syncBranchAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
      .addCase(fetchBranchsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.branchs = action.payload;
      })
      .addCase(fetchBranchsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBranchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranchAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.branchs.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createBranchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateBranchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranchAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBranch = action.payload;
        const index = state.branchs.findIndex(
          (branch) => branch.id === updatedBranch.id
        );
        if (index !== -1) {
          state.branchs[index] = updatedBranch;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateBranchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteBranchAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranchAsync.fulfilled, (state, action) => {
        state.loading = false;
        const branchId = action.payload;
        state.branchs = state.branchs.filter((branch) => branch.id !== branchId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteBranchAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateBranch } = branchSlice.actions;
export const branchReducer = branchSlice.reducer;
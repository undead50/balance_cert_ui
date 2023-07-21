import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from 'axiosInstance';
import axiosInstance from '../../hooks/axiosInstance';

const initialState = {
  privileges: [],
  loading: false,
  error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchPrivilegesAsync = createAsyncThunk('privilege/fetchPrivileges', async () => {
  try {
    const url = BACKEND_URL + '/privilege/fetchPrivileges';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createPrivilegeAsync = createAsyncThunk(
  'privilege/createPrivilege',
  async (privilegeData) => {
    try {
      const url = BACKEND_URL + '/privilege/createPrivilege';
      const response = await axiosInstance.post(url, privilegeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updatePrivilegeAsync = createAsyncThunk(
  'privilege/updatePrivilege',
  async (privilegeData) => {
    try {
      const url = BACKEND_URL + `/privilege/updatePrivilege/${privilegeData.id}`;
      const response = await axiosInstance.put(url, privilegeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deletePrivilegeAsync = createAsyncThunk(
  'privilege/deletePrivilege',
  async (privilegeId) => {
    try {
      const url = BACKEND_URL + `/privilege/deletePrivilege/${privilegeId}`;
      await axiosInstance.delete(url);
      return privilegeId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const privilegeSlice = createSlice({
  name: 'privilege',
  initialState,
  reducers: {
    resetStatePrivilege: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivilegesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivilegesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges = action.payload;
      })
      .addCase(fetchPrivilegesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPrivilegeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrivilegeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.privileges.push(action.payload);
      })
      .addCase(createPrivilegeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePrivilegeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePrivilegeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPrivilege = action.payload;
        const index = state.privileges.findIndex(
          (privilege) => privilege.id === updatedPrivilege.id
        );
        if (index !== -1) {
          state.privileges[index] = updatedPrivilege;
        }
      })
      .addCase(updatePrivilegeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePrivilegeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrivilegeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const privilegeId = action.payload;
        state.privileges = state.privileges.filter((privilege) => privilege.id !== privilegeId);
      })
      .addCase(deletePrivilegeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetStatePrivilege } = privilegeSlice.actions;
export const privilegeReducer = privilegeSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
// import axiosInstance from 'axiosInstance';

const callNotification = ((description, type) => {
  notification.open({
    message: 'info',
    description: description,
    duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
    type: type,
  });
})

const initialState = {
  categorys: [],
  loading: false,
  error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;



export const fetchCategorysAsync = createAsyncThunk(
  'category/fetchCategorys',
  async () => {
    try {
      const url = BACKEND_URL + '/category/fetchCategorys';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  'category/createCategory',
  async (categoryData) => {
    try {
      const url = BACKEND_URL + '/category/createCategory';
      const response = await axiosInstance.post(url, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'category/updateCategory',
  async (categoryData) => {
    try {
      const url = BACKEND_URL + `/category/updateCategory/${categoryData.id}`;
      const response = await axiosInstance.put(url, categoryData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId) => {
    try {
      const url = BACKEND_URL + `/category/deleteCategory/${categoryId}`;
      await axiosInstance.delete(url);
      return categoryId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetStateCategory: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorysAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorysAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = action.payload;
      })
      .addCase(fetchCategorysAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys.push(action.payload);
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categorys.findIndex(
          (category) => category.id === updatedCategory.id
        );
        if (index !== -1) {
          state.categorys[index] = updatedCategory;
        }

        callNotification('Operation Sucessfull', 'success')
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categoryId = action.payload;
        state.categorys = state.categorys.filter(
          (category) => category.id !== categoryId
        );
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetStateCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;

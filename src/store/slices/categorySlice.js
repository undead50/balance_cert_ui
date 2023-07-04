import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getCategoryData = createAsyncThunk('/categoryData',async(payload)=>{
    try {
      const url = BACKEND_URL + '/categories';
      const { data } = await axios.get(url,payload);
      return data
    }
    catch(err){
      return err
    }
  })

const categorySlice = createSlice({
    name:'category',
    initialState:{
        data : null,
        loading:false,
        error: false
    },
    reducers: {
        setCategoryData: (state,action) => {
          state.data = action.payload
        }
    },
    extraReducers: {
        [getCategoryData.pending]: (state) => {
          state.loading = true;
        },
        [getCategoryData.fulfilled]: (state, action) => {
          state.loading = false;
          state.data = action.payload;
        },
        [getCategoryData.rejected]: (state, action) => {
          state.loading = false;
          state.error = true;
        }
      }
})

export const { setCategoryData} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
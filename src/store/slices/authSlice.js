import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from './../../config';
import axios from 'axios';

export const postLoginData = createAsyncThunk('auth/postLoginData',async(payload)=>{
  try {
    const url = BACKEND_URL + '/auth/adlogin';
    const { data } = await axios.post(url,payload);
    return data
  }
  catch(err){
    return err
  }
})



const authSlice = createSlice({
    reducerPath: 'authreducerPath',
    name:'auth',
    initialState: {
        isLoggedIn: false,
        data: null,
        loading:false,
        error: false
    },
    reducers: {
        login: (state) => {
          state.isLoggedIn = true;
        },
        logout: (state) => {
          state.isLoggedIn = false;
        }
    },
    extraReducers: {
      [postLoginData.pending]: (state) => {
        state.loading = true;
      },
      [postLoginData.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      [postLoginData.rejected]: (state, action) => {
        state.loading = false;
        state.error = true;
      }
    }
})

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
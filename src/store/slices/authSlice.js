import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    reducerPath: 'authreducerPath',
    name:'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        login: (state) => {
          state.isLoggedIn = true;
        },
        logout: (state) => {
          state.isLoggedIn = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
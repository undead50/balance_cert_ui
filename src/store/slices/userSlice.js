import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            userName: '',
            solId: '',
            email: '',
            departmentName: '',
            token: '',
            isBranchManager: ''
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {
        userName: '',
        solId: '',
        email: '',
        departmentName: '',
        token: '',
        isBranchManager: '',
        employeeName: '',
        photoId: '',
        image: '',
        isSuperAdmin:false
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload
        },
        resetStateUser: (state) => initialState
    }
})

export const { setUser, resetStateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) ?? false
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginHandle: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.user = action.payload
        },
        logoutHandle: (state) => {
            localStorage.removeItem("user")
            state.user = false
        }
    }
})

// Action creators are generated for each case reducer function
export const { loginHandle, logoutHandle } = auth.actions

export default auth.reducer
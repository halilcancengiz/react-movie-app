import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}
export const userLists = createSlice({
    name: 'userLists',
    initialState,
    reducers: {
        setLists: (state, action) => {
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setLists } = userLists.actions

export default userLists.reducer
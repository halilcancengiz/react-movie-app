import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const allUserImages = createSlice({
    name: 'allUserImages',
    initialState,
    reducers: {
        setAllUsersImages: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAllUsersImages } = allUserImages.actions

export default allUserImages.reducer
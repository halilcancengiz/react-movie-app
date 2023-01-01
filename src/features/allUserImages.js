import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}
export const allUserImages = createSlice({
    name: 'allUserImages',
    initialState,
    reducers: {
        setAllUserImages: (state, action) => {
            state.value = action.payload
        },

    }
})

// Action creators are generated for each case reducer function
export const { setAllUserImages } = allUserImages.actions

export default allUserImages.reducer
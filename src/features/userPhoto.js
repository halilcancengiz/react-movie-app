import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const userPhoto = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setPhoto: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setPhoto } = userPhoto.actions

export default userPhoto.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: ""
}

export const searchValue = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setSearch } = searchValue.actions

export default searchValue.reducer
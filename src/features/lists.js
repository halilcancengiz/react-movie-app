import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [] 
}

export const lists = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        setLists: (state, action) => {
            state.lists = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setLists } = lists.actions

export default lists.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        userComments: [],
        movieComments: []
    }
}
export const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setUserComments: (state, action) => {
            state.value.userComments = action.payload
        },
        setMovieComments: (state, action) => {
            state.value.movieComments = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUserComments, setMovieComments } = comments.actions

export default comments.reducer